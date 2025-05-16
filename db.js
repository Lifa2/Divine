const mysql = require('mysql');

// Replace these values with your MySQL credentials and DB name
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '40316815',
  database: 'divine_form'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
