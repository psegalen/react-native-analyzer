const Log = require("../Tools/Log");
const FileTypes = require("./FileTypes");

class Package {
  constructor(path) {
    Log.focus(`>>> Package.json found >>> ${path}`);
    this.path = path;
    this.name = "package.json";
    this.type = FileTypes.Package;
  }

  analyze() {
    const config = require(this.path);
    if (config.dependencies) {
      if (config.dependencies["react-native"]) {
        Log.valid(
          `>>> React Native Version: ${config.dependencies["react-native"]}`
        );
        this.isRNProject = true;
      } else {
        this.isRNProject = false;
      }
      if (config.dependencies["expo"]) {
        Log.valid(
          `>>> Expo detected! Version: ${config.dependencies["expo"]}`
        );
        this.isExpoProject = true;
      } else {
        this.isExpoProject = false;
      }
    }
    return this;
  }
}

module.exports = Package;
