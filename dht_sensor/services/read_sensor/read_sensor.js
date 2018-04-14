const exec = require('child_process').exec;
const logger = require(`${__base}/logger`);
const config = require(`${__base}/config`);
const Promise = require('bluebird');
const sendRecord = require('../sendRecord');

module.exports = () => {
    if(config.node_env === 'test') {
        logger.info({temp: 21.5, humidity: 55.5, date: new Date().getTime()});
        return sendRecord({temp: 21.5, humidity: 55.5, date: new Date().getTime()})
    } else {
        exec(`cd ${__base}services/read_sensor/ && ./read_sensor.py`, (e, stdout, stderr) => {
            if (e instanceof Error) {
                return Promise.reject(e);
            }
            const object = JSON.parse(stdout);
            object.date = new Date();
            logger.info(object);
            return sendRecord(object)
        });
    }    
}
