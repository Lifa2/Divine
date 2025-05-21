require('dotenv').config();
const express = require('express');
const path = require('path');
const connection = require('./db');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/membership', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'membership.html'));
});

// Save visitor registration -> registrations table
app.post('/submit-registration', (req, res) => {
  const { name, surname, number, address, gender, membership, speak, visit } = req.body;
  const sql = `INSERT INTO registrations (name, surname, number, address, gender, membership, speak, visit)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    name || null,
    surname || null,
    number || null,
    address || null,
    gender || null,
    membership || null,
    speak || null,
    visit || null
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Visitor registration failed:', err);
      return res.status(500).send('Error saving registration.');
    }
    console.log('✅ Visitor registered.');
    res.send('Visitor registration successful!');
  });
});

// Save membership registration -> members table
app.post('/submit-membership', (req, res) => {
  const {
    full_name, contact, address, status_set, gender, age_group, birthday,
    occupation, accepted_jesus, baptised, start_attending, hobbies, gifts, role,
    child1_name, child1_dob, child2_name, child2_dob,
    child3_name, child3_dob, child4_name, child4_dob,
    agreement_date, signature
  } = req.body;

  const sql = `
    INSERT INTO members (
      full_name, contact, address, status_set, gender, age_group,
      birthday, occupation, accepted_jesus, baptised, start_attending,
      hobbies, gifts, role,
      child1_name, child1_dob,
      child2_name, child2_dob,
      child3_name, child3_dob,
      child4_name, child4_dob,
      agreement_date, signature
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    full_name || null,
    contact || null,
    address || null,
    status_set || null,
    gender || null,
    age_group || null,
    birthday || null,
    occupation || null,
    accepted_jesus || null,
    baptised || null,
    start_attending || null,
    hobbies || null,
    gifts || null,
    role || null,
    child1_name || null,
    child1_dob || null,
    child2_name || null,
    child2_dob || null,
    child3_name || null,
    child3_dob || null,
    child4_name || null,
    child4_dob || null,
    agreement_date || null,
    signature || null
  ];

  connection.execute(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Membership registration failed:', err);
      res.status(500).send('Something went wrong.');
    } else {
      res.send('✅ Registration successful!');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
