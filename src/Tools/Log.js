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
};

module.exports = Log;
