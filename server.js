const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');  // your MySQL connection

const app = express();
const PORT = 3000;

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
    date,           // from form (use as date_submitted)
    name,
    surname,
    address,
    contact,        // this corresponds to contact_number
    gender,
    ageGroup,
    membership,     // membership_interest
    visit,          // home_visit
    talkToBishop
  } = req.body;

  // Map to the correct DB column variable names
  const dateSubmitted = date;
  const contactNumber = contact;
  const age_group = ageGroup;
  const membershipInterest = membership;
  const homeVisit = visit;

  const sql = `
    INSERT INTO divine_form.members
    (date_submitted, name, surname, address, contact_number, gender, age_group, membership_interest, home_visit, talk_to_bishop)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [dateSubmitted, name, surname, address, contactNumber, gender, age_group, membershipInterest, homeVisit, talkToBishop];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.send('Form submitted successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
