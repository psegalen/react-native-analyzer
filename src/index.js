const Directory = require("./Directory");
const Log = require("./Tools/Log");

const script = () => {
  if (process.argv.length <= 2) {
    Log.error(`Usage: "node ${__filename} path/to/directory`);
    process.exit(-1);
  }

  const path = process.argv[2];
  const rootDir = new Directory(path);
  rootDir.analyze(true);
};

module.exports = script;
