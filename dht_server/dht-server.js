global.__base = __dirname + '/';

require('dotenv').config();

const config = require('./config');
const express = require('express')
const app = express()
const logger = require('./logger');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const db = require('./db/db');
const Joi = require('joi');

const schema = Joi.object().keys({
    temp: Joi.number().required(),
    humidity: Joi.number().required(),
    date: Joi.number().required(),
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(basicAuth({
    users: {
        [config.auth.httpUser]: config.auth.httpPassword
    }
}))
db.open()
    .then(() => {
        app.post('/records', function(req, res, next) {
            logger.info(req.method, req.path, req.query);
            logger.info(`Body: ${JSON.stringify(req.body)}`);
            const result = Joi.validate(req.body, schema);
            if (result.error)
                res.status(422).json(result.error.details);
            else
                db.insert(config.database.table_name, result.value)
                    .then(() => {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200);
                    });
        });

        app.get('/records', function(req, res, next) {

            logger.info(req.method, req.path, req.query);
            logger.info(`Body: ${JSON.stringify(req.body)}`);

            db.read(config.database.table_name)
                .then((result) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(result);
                })
                .catch(next)
        });


        app.listen(config.server.port, function() {
            logger.debug(`DHT Sensor server listening on port ${config.server.port}!`)
        });
        app.use(function(err, req, res, next) {
            res.status(500, {
                error: err
            });
        })
    })
    .catch((err) => {
        logger.error('Could not open database');
        logger.error(err);
        process.exit(1);
    })