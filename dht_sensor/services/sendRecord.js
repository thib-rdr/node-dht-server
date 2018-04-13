const r = require('request-promise');
const config = require(`${__base}/config`);
const logger = require(`${__base}/logger`)

module.exports = (body) =>
    r({
        method: 'POST',
        uri: config.distant_server.address + 'records',
        body,
        headers: {
            'Authorization': 'Basic ' + new Buffer(config.distant_server.httpUser + ':' + config.distant_server.httpPassword).toString('base64'),
        },
        json: true
    })
    .then((result) => {
        return result;
    })
    .catch((err) => { 
        logger.error(err.message);
     })