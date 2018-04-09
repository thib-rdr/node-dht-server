module.exports = {

    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },

    server: {
        port: process.env.SERVER_PORT,
    },

    rateLimit: {
        total: process.env.RATE_LIMIT_TOTAL,
        expire: process.env.RATE_LIMIT_EXPIRE,
    },

    log: {
        level: process.env.LOG_LEVEL,
        dateformat: process.env.LOG_DATE_FORMAT
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE_IN,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
    },

    timezone: process.env.TIMEZONE,
    node_env: process.env.NODE_ENV
};