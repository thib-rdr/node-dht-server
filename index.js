if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}

const config = require('./config.js');
const express = require('express')
const app = express()
const exec = require('child_process').exec;
const logger = require('tracer').colorConsole(config.log);

process.env.PG_CONNECTION_STRING = 'postgres://' + config.database.user + ':' + config.database.password + '@' + config.database.host + '/' + config.database.database;;

app.get('/read_sensor', function (req, res) {
  exec('./read_sensor.py', (e, stdout, stderr) => {
    if (e instanceof Error) {
      console.error(e);
      throw e;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(stdout);
  });
})
app.listen(config.server.port, function () {
  logger.debug('Example app listening on port 3000!')
})