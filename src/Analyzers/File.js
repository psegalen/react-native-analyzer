const Package = require("./Package");
const Log = require("../Tools/Log");
const FileSystem = require("../Tools/FileSystem");

class File {
  constructor(path) {
    this.path = path;
    this.fileName = FileSystem.getItemName(path);
  }

  analyze() {
    if (this.shouldSkip()) {
      Log.debug(`Skipped file "${this.fileName}"`);
      return;
    }

    Log.info(`Analyzing file: ${this.fileName}`);
  }

  shouldSkip() {
    if (
      this.fileName.startsWith(".") ||
      this.fileName === "package.json"
    ) {
      return true;
    }
    return false;
  }
}

module.exports = File;
