/**
 * Bootstrap file
 */

global.__base = __dirname + '/';

require('dotenv').config();

process.env.NODE_ENV = 'test-dev';
const config = require('./config');
const db = require('./db/db')
let server = null;

before((done) => {
    server = require('./dht-server')
    server.start()
        .then(() => done())
});

after(() => {

});

beforeEach((done) => {
    done();
});

afterEach(() => {
    db.clean(config.database.table_name)
        .then(() => done())
});