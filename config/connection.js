const mysql = require('mysql');

//connection db
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest_api_aprilbakery'
})

conn.connect((err) => {
    if (err) throw err;
    console.log("Database Connected")
})

module.exports = conn