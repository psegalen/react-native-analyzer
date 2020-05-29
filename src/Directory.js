const fs = require("fs");
const Package = require("./Analyzers/Package");
const Log = require("./Tools/Log");
const FileSystem = require("./Tools/FileSystem");
const File = require("./Analyzers/File");

class Directory {
  constructor(path) {
    this.path = path;
    this.folderName = FileSystem.getItemName(path);
  }

  analyze(isRootDir = false) {
    if (!isRootDir && this.shouldSkip()) {
      Log.debug(`Skipped dir "${this.folderName}"`);
      return;
    }

    Log.info(`Analyzing dir "${this.folderName}"`);
    fs.readdir(
      this.path,
      { withFileTypes: true },
      function (err, items) {
        if (err) {
          Log.error(err);
        } else {
          let packageDetected = false;
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.isDirectory()) {
              const dir = new Directory(
                FileSystem.combinePaths(this.path, item.name)
              );
              dir.analyze();
            } else if (item.isFile()) {
              const fileAnalysis = this.handleFile(
                item.name,
                isRootDir
              );
              if (fileAnalysis.type === "package") {
                packageDetected = true;
                if (isRootDir && !fileAnalysis.isRNProject) {
                  Log.error("Not a React Native project!");
                  process.exit(-1);
                }
              }
            }
          }
          if (isRootDir && !packageDetected) {
            Log.error("Not a React Native project!");
            process.exit(-1);
          }
        }
      }.bind(this)
    );
  }

  shouldSkip() {
    switch (this.folderName) {
      case "__tests__":
      case ".idea":
      case "node_modules":
        return true;
      default:
        return false;
    }
  }

  handleFile(itemName, isRootDir = false) {
    const filePath = FileSystem.combinePaths(this.path, itemName);

    if (itemName === "package.json") {
      const pack = new Package(filePath);
      return {
        type: "package",
        isRNProject: pack.isReactNativeProject(),
      };
    } else {
      const file = new File(filePath);
      file.analyze();
      return {
        type: "other",
      };
    }
  }
}

module.exports = Directory;
