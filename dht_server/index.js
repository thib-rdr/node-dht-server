global.__base = __dirname + '/';

require('dotenv').config();

require('./dht-server').start();