const { Client } = require('pg');

module.exports.client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgrespw',
    port: 5436,
});
