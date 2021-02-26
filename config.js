require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER,
    DB_PASSWD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT || 3306,
    DB_DIALECT: process.env.DB_DIALECT,
    AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET,
    PUBLIC_API_KEY_TOKEN: process.env.PUBLIC_API_KEY_TOKEN,
    ADMIN_API_KEY_TOKEN: process.env.ADMIN_API_KEY_TOKEN,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
}

module.exports = config;