const Directory = require("./Directory");
const Log = require("./Tools/Log");

const script = () => {
  if (process.argv.length <= 2) {
    Log.error('Usage: "npm start path/to/project"');
    process.exit(-1);
  }

  Log.info("Welcome to React Native Analyzer!");

  const path = process.argv[2];
  const rootDir = new Directory(path);
  rootDir.analyze(true);

  Log.printStructure(rootDir);
  const stats = Log.getStats(rootDir);
  Log.info(stats);
};

module.exports = script;
