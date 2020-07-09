var log4js = require("log4js");

log4js.configure({
<<<<<<< HEAD
<<<<<<< HEAD
    appenders: { monitor: {type:"file", filename: "/home/ubuntu/webapp/webapp/webapp/monitor.log"}},
=======
    appenders: { monitor: {type:"file", filename: "monitor.log"}},
>>>>>>> a
=======
    appenders: { monitor: {type:"file", filename: "/home/ubuntu/webapp/webapp/webapp/monitor.log"}},
>>>>>>> a
    categories:{default: {appenders: ["monitor"], level:"info"}}
});

const logger = log4js.getLogger("monitor");
module.exports = logger;
