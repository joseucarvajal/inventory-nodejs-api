import dotenv from 'dotenv';

dotenv.config();

export default {
    pgSettings: {
        user: process.env.PG_USR,
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        password: process.env.PG_PWD,
        port: process.env.PG_PORT
    },
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV,
}