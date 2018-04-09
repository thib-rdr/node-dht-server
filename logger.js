var config = require('./config');
var logger;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'developement') {
    logger = require('tracer').console(config.log);
} else {
    logger = require('tracer').colorConsole(config.log);
}
module.exports = logger;