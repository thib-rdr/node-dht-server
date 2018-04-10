const exec = require('child_process').exec;
const logger = require(`${__base}/logger`);
const config = require(`${__base}/config`);
const db = require(`${__base}/db/db`);
const Promise = require('bluebird');

module.exports = () => {
    if(config.node_env === 'test') {
        logger.info({temp: 21.5, humidity: 55.5, date: new Date()});
        return db.insert(config.database.table_name, {temp: 21.5, humidity: 55.5, date: new Date()})
    } else {
        exec(`cd ${__base}services/read_sensor/ && ./read_sensor.py`, (e, stdout, stderr) => {
            if (e instanceof Error) {
                return Promise.reject(e);
            }
            const object = JSON.parse(stdout);
            object.date = new Date();
            logger.info(object);
            return db.insert(config.database.table_name, object);
        });
    }    
}
