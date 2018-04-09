const exec = require('child_process').exec;
const logger = require(`${__base}/logger`);
const config = require(`${__base}/config`);

module.exports = () => {
    if(config.node_env === 'test') {
        logger.info({temp: 21.5, humidity: 55.5});
        return JSON.stringify({temp: 21.5, humidity: 55.5});
    } else {
        exec(`cd ${__base}services/read_sensor/ && ./read_sensor.py`, (e, stdout, stderr) => {
            if (e instanceof Error) {
                throw e;
            }
            logger.info(stdout);
        });
    }    
}
