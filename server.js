require('dotenv').config();
const express = require('express');
const path = require('path');
const connection = require('./db');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
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
    talkToBishop,
    speak // ✅ Added this field to match the HTML
  } = req.body;

  const sql = `INSERT INTO registrations 
    (date, name, surname, number, address, contact, gender, ageGroup, membership, speak, visit, talkToBishop)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    date,
    name,
    surname,
    contact,       // number
    address,
    contact,
    gender,
    ageGroup,
    membership,
    speak,
    visit,
    talkToBishop
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).send('Database insert failed');
    }
    res.send('Registration successful!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
