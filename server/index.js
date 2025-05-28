const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MySQL (XAMPP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'aP@DA7@8a$3!', // Ensure this is your correct MySQL root password
  database: 'myapp_db'
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');

  // Create users table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(100)
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('✅ Users table ready');
    }
  });
});

// API: Get all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// API: User Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // In a real application, you would hash the password before comparing
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      res.json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' }); // Use 401 for unauthorized
    }
  });
});

// API: User Registration (Signup)
app.post('/api/register', (req, res) => {
  const { fullName, email, password } = req.body;

  // Basic validation
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // In a real application, you should hash the password before storing it
  // Example: bcrypt.hash(password, 10, (err, hash) => { ... });

  const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(insertQuery, [fullName, email, password], (err, result) => {
    if (err) {
      // Check for duplicate email error (MySQL error code for duplicate entry)
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email already registered.' }); // 409 Conflict
      }
      console.error('Registration error:', err);
      return res.status(500).json({ message: 'Database error during registration.' });
    }
    res.status(201).json({ message: 'User registered successfully!' }); // 201 Created
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
