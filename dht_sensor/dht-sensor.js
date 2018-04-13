global.__base = __dirname + '/';

require('dotenv').config();


require(__base + 'services/cron.js')();