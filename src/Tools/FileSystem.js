const FileSystem = {
  getItemName(path) {
    const separator = path.indexOf("\\") !== -1 ? "\\" : "/";
    return path.split(separator).pop();
  },
  combinePaths(path, itemName) {
    const separator = path.indexOf("\\") !== -1 ? "\\" : "/";
    return `${path}${separator}${itemName}`;
  },
};

module.exports = FileSystem;
