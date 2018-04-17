const config = require('../config');
const mongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const logger = require('../logger');
let db = null;

const open = () =>
    mongoClient.connect(config.database.uri)
    .then(client => {
        db = client.db(config.database.name);
        logger.info('Connection to database initialized')
        return db;
    })


const close = (db) => {
    if (db) db.close();
}

const insert = (table, object) => db.collection(table).insert(object);
const read = (table, query = {}) =>
    db.collection(table)
    .find(query)
    .sort({ date: -1 })
    .toArray();

const clean = (table) => db.collection(table).deleteMany({})

module.exports = {
    open,
    close,
    insert,
    read,
    clean,
}