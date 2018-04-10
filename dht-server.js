global.__base = __dirname + '/';

require('dotenv').config();

const config = require('./config');
const express = require('express')
const app = express()
const logger = require('./logger');
const db = require('./db/db');

db.open().then(() => {
  require(__base + 'services/cron.js')();

  app.get('/read_sensor', function (req, res, next) {

    logger.info(req.method, req.path, req.query);

    db.read(config.database.table_name)
      .then((result) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
      })
      .catch(next)
  });

  app.listen(config.server.port, function () {
    logger.debug(`DHT Sensor server listening on port ${config.server.port}!`)
  });

  app.use(function (err, req, res, next) {
    res.status(500, { error: err });
  })

})