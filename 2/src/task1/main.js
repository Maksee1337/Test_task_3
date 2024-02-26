const fs = require('fs');
const textToObj = require('./textToObj')
const saveObj = require('./saveObj')

fs.readFile('./tmp/dump.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        try {
            saveObj(textToObj(data));
            console.log('Done')
        } catch (e) {
            console.error(e);
        }
    }
);
