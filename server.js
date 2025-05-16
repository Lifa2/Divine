const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup MySQL connection using Heroku's ClearDB URL
const db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the form page on homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const {
    date,
    name,
    surname,
    address,
    contact,
    gender,
    ageGroup,
    membership,
    visit,
    talkToBishop
  } = req.body;

  const sql = `
    INSERT INTO members
    (date_submitted, name, surname, address, contact_number, gender, age_group, membership_interest, home_visit, talk_to_bishop)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    date,
    name,
    surname,
    address,
    contact,
    gender,
    ageGroup,
    membership,
    visit,
    talkToBishop
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.send('Form submitted successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
