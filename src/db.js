const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

const db = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'be35c3e0e7e07b',
    password: '8f398cbf',
    database: 'heroku_1bf63e752039211'
});

app.get('/test', (req, res) => {
    db.query('SELECT * FROM test', (err, result) => {
        if (err) {
            console.error(err);
            return
        } else {
            res.send(result);
        }
    });
});

app.listen(3210, () => {
    console.log('Server active on port 3210')
});