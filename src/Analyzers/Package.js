const Log = require("../Tools/Log");

class Package {
  constructor(path) {
    Log.focus(`>>> Package.json found >>> ${path}`);
    this.path = path;
  }

  isReactNativeProject() {
    const config = require(this.path);
    if (config.dependencies && config.dependencies["react-native"]) {
      Log.valid(
        `>>> React Native version: ${config.dependencies["react-native"]}`
      );
      return true;
    }
    return false;
  }
}

module.exports = Package;
