const Package = require("./Package");
const Log = require("../Tools/Log");
const FileSystem = require("../Tools/FileSystem");
const FileTypes = require("./FileTypes");

class File {
  constructor(path) {
    this.path = path;
    this.name = FileSystem.getItemName(path);
  }

  analyze() {
    if (this.shouldSkip()) {
      Log.debug(`Skipped file "${this.name}"`);
      return null;
    }

    Log.info(`Analyzing file: ${this.name}`);
    if (this.name.endsWith(".js") || this.name.endsWith(".jsx")) {
      this.type = FileTypes.JS;
    } else if (
      this.name.endsWith(".png") ||
      this.name.endsWith(".jpg") ||
      this.name.endsWith(".svg")
    ) {
      this.type = FileTypes.Image;
    } else if (this.name.endsWith(".ttf")) {
      this.type = FileTypes.Font;
    } else if (this.name.endsWith(".json")) {
      this.type = FileTypes.JSON;
    } else {
      this.type = FileTypes.Unkown;
    }

    return this;
  }

  shouldSkip() {
    if (
      this.name.startsWith(".") ||
      this.name === "package.json" ||
      this.name === "yarn.lock" ||
      this.name.endsWith(".log") ||
      this.name.endsWith(".jks")
    ) {
      return true;
    }
    return false;
  }
}

module.exports = File;
