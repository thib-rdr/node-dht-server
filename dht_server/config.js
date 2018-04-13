module.exports = {
    database: {
        uri: process.env.MONGODB_URI,
        name: process.env.MONGODB_DB_NAME,
        table_name: process.env.MONGODB_TABLE_NAME
    },
    
    auth: {
        httpUser: process.env.SERVER_USER,
        httpPassword: process.env.SERVER_PWD,
    },

    server: {
        port: process.env.SERVER_PORT,
    },

    log: {
        level: process.env.LOG_LEVEL,
        dateformat: process.env.LOG_DATE_FORMAT
    },

    timezone: process.env.TIMEZONE,
    node_env: process.env.NODE_ENV
};