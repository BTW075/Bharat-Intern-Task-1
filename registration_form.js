
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Bharat-Intern'
});

db.connect((err) => {
    if (err) {
        console.error('Error reaching to MySQL: ' + err.stack);
        return;
    }
    console.log('Connection Successfull to MySQL as id ' + db.threadId);
});


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('User Registration ERROR: ' + err.stack);
            res.status(500).send('User Registration ERROR');
            return;
        }
        console.log('User Registration Successfull');
        res.send('User Registration Successfull');
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
