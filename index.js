global.__base = __dirname + '/';

require('dotenv').config();

const config = require('./config');
const express = require('express')
const app = express()
const logger = require('./logger');

process.env.PG_CONNECTION_STRING = 'postgres://' + config.database.user + ':' + config.database.password + '@' + config.database.host + '/' + config.database.database;;

require(__base + 'services/cron.js')();



// app.get('/read_sensor', function (req, res) {

// })
// app.listen(config.server.port, function () {
//   logger.debug('Example app listening on port 3000!')
// })