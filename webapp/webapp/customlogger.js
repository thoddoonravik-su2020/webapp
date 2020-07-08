var log4js = require("log4js");

log4js.configure({
    appenders: { monitor: {type:"file", filename: "monitor.log"}},
    categories:{default: {appenders: ["monitor"], level:"error"}}
});

const logger = log4js.getLogger("monitor");
module.exports = logger;
