const date = require("date-fns");

module.exports = function currentDateTime() {
  return {
    date: date.format(new Date(), "yyyy-MM-dd"),
    time: date.format(new Date(), "HH:mm:ss"),
  };
};
