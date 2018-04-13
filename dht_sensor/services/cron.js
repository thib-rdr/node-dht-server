const cron = require('cron').CronJob;
const tasks = require('./tasks');
const config = require(`${__base}/config`);
const logger = require(`${__base}/logger`);
const Promise = require('bluebird');

module.exports = () => {
    return Promise.map(tasks, (task) => {
        const func = require(__base + task.service);
        if (!typeof func === "function") {
            return Promise.reject(new Error('incorrect job, not a function'));
        }
        const job = new cron({
            cronTime: task.cronTime,
            onTick: func,
            start: config.node_env === 'test',
            timeZone: config.timezone
        });
        
        logger.info('Loaded job ' + task.service);
        if(config.node_env === 'test')
            require(__base + task.service)()
        job.start();
   })
}