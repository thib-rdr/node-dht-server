module.exports = {

    distant_server: {
        address: process.env.DISTANT_SERVER_ADDRESS,
        httpUser: process.env.DISTANT_SERVER_USER,
        httpPassword: process.env.DISTANT_SERVER_PWD,
    },

    server: {
        port: process.env.SERVER_PORT,
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