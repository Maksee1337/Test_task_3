const {client} = require('../config/db');
const fs = require('fs');

client.connect().then(async () => {
    console.log('Connected to DB');
    fs.readFile('./src/createDb/db.sql', 'utf8', async (err, data) => {
        if (err) {
            console.log(err);
        }
        try {
            await client.query(data);
            client.end();
            console.log('DB created');
        } catch (e) {
            console.log(e);
        }
    });
});
