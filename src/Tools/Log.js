const FileTypes = require("../Analyzers/FileTypes");

const Log = {
  debug(msg) {
    console.log(msg.gray);
  },
  info(msg) {
    console.log(msg);
  },
  focus(msg) {
    console.log(msg.blue);
  },
  valid(msg) {
    console.log(msg.green);
  },
  warn(msg) {
    console.log(msg.orange);
  },
  error(msg) {
    console.log(msg.red);
  },
  printStructure(dir, depth = 0) {
    dir.children.forEach((obj) => {
      const prefix = new Array(depth).join(">");
      Log.info(`${prefix}${obj.name}`);
      if (obj.children) {
        Log.printStructure(obj, depth + 1);
      }
    });
  },
  getStats(dir) {
    let nbDirs = 0;
    let nbJSFiles = 0;
    let nbUnkown = 0;
    let nbPackage = 0;
    let nbImages = 0;
    let nbFonts = 0;
    let nbJson = 0;
    dir.children.forEach((obj) => {
      switch (obj.type) {
        case "Directory":
          const stats = Log.getStats(obj);
          nbDirs++;
          nbDirs += stats.nbDirs;
          nbJSFiles += stats.nbJSFiles;
          nbPackage += stats.nbPackage;
          nbFonts += stats.nbFonts;
          nbImages += stats.nbImages;
          nbJson += stats.nbJson;
          nbUnkown += stats.nbUnkown;
          break;
        case FileTypes.JS:
          nbJSFiles++;
          break;
        case FileTypes.Package:
          nbPackage++;
          break;
        case FileTypes.Font:
          nbFonts++;
          break;
        case FileTypes.Image:
          nbImages++;
          break;
        case FileTypes.JSON:
          nbJson++;
          break;
        case "Unkown":
        default:
          nbUnkown++;
          break;
      }
    });
    return {
      nbDirs,
      nbPackage,
      nbJSFiles,
      nbFonts,
      nbImages,
      nbJson,
      nbUnkown,
    };
  },
};

module.exports = Log;
