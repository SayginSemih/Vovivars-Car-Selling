const mysql = require("mysql2");

let con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'vovicars'
});

module.exports = con;

