const fs = require("fs");
const Package = require("./Analyzers/Package");
const Log = require("./Tools/Log");
const FileSystem = require("./Tools/FileSystem");
const File = require("./Analyzers/File");
const FileTypes = require("./Analyzers/FileTypes");

class Directory {
  constructor(path) {
    this.path = path;
    this.name = FileSystem.getItemName(path);
    this.type = FileTypes.Directory;
  }

  analyze(isRootDir = false) {
    if (!isRootDir && this.shouldSkip()) {
      Log.debug(`Skipped dir "${this.name}"`);
      return null;
    }

    this.children = [];

    Log.info(`Analyzing dir "${this.name}"`);
    const objs = fs.readdirSync(this.path, { withFileTypes: true });
    objs.sort((obj1, obj2) =>
      obj1.isDirectory() && !obj2.isDirectory()
        ? -1
        : obj2.isDirectory() && !obj1.isDirectory()
        ? 1
        : obj1.name > obj2.name
        ? 1
        : -1
    );
    let packageDetected = false;
    objs.forEach((item) => {
      if (item.isDirectory()) {
        const dir = new Directory(
          FileSystem.combinePaths(this.path, item.name)
        );
        const dirAnalysis = dir.analyze();
        if (dirAnalysis) this.children.push(dirAnalysis);
      } else if (item.isFile()) {
        const fileAnalysis = this.handleFile(item.name);
        if (fileAnalysis) {
          if (fileAnalysis.type === "Package") {
            packageDetected = true;
            if (isRootDir && !fileAnalysis.isRNProject) {
              Log.error("Not a React Native project!");
              process.exit(-1);
            }
          }
          this.children.push(fileAnalysis);
        }
      }
    });
    if (isRootDir && !packageDetected) {
      debugger;
      Log.error("Not a React Native project!");
      process.exit(-1);
    }

    return this;
  }

  shouldSkip() {
    switch (this.name) {
      case "__tests__":
      case ".idea":
      case "node_modules":
        return true;
      default:
        return false;
    }
  }

  handleFile(itemName) {
    const filePath = FileSystem.combinePaths(this.path, itemName);

    if (itemName === "package.json") {
      const pack = new Package(filePath);
      return pack.analyze();
    } else {
      const file = new File(filePath);
      return file.analyze();
    }
  }
}

module.exports = Directory;
