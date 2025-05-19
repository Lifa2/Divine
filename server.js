const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to load the main form page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submissions
app.post('/submit-form', (req, res) => {
  const {
    date, name, surname, address, contact,
    gender, ageGroup, membership, visit, talkToBishop
  } = req.body;

  const sql = `
    INSERT INTO registrations 
    (date, name, surname, address, contact, gender, ageGroup, membership, visit, talkToBishop)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    date, name, surname, address, contact,
    gender, ageGroup, membership, visit, talkToBishop
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error inserting data:', err);
      return res.status(500).send('Something went wrong.');
    }
    console.log('✅ New registration saved!');
    res.status(200).send('Registration successful!');
  });
});



// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
