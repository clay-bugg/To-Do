const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./todo.db');

// JWT secret key (keep this safe in real apps!)
const SECRET = 'your_super_secret_key';

// Create tables if not exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    text TEXT,
    completed INTEGER DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

// Register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (user) return res.status(400).json({ error: 'User exists' });
    const hashed = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], function(err) {
      if (err) return res.status(500).json({ error: 'Error registering user' });
      res.json({ success: true });
    });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (!user) return res.status(400).json({ error: 'User not found' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid password' });
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get To-Dos
app.get('/api/todos', auth, (req, res) => {
  db.all('SELECT * FROM todos WHERE user_id = ?', [req.userId], (err, rows) => {
    res.json({ todos: rows });
  });
});

// Add To-Do
app.post('/api/todos', auth, (req, res) => {
  const { text } = req.body;
  db.run('INSERT INTO todos (user_id, text) VALUES (?, ?)', [req.userId, text], function(err) {
    if (err) return res.status(500).json({ error: 'Could not add todo' });
    res.json({ id: this.lastID, text, completed: 0 });
  });
});

// Toggle Complete
app.put('/api/todos/:id/toggle', auth, (req, res) => {
  const todoId = req.params.id;
  db.get('SELECT completed FROM todos WHERE id = ? AND user_id = ?', [todoId, req.userId], (err, row) => {
    if (!row) return res.status(404).json({ error: 'To-Do not found' });
    const newStatus = row.completed ? 0 : 1;
    db.run('UPDATE todos SET completed = ? WHERE id = ?', [newStatus, todoId], function(err) {
      res.json({ success: true });
    });
  });
});

// Delete To-Do
app.delete('/api/todos/:id', auth, (req, res) => {
  const todoId = req.params.id;
  db.run('DELETE FROM todos WHERE id = ? AND user_id = ?', [todoId, req.userId], function(err) {
    if (err) return res.status(500).json({ error: 'Could not delete todo' });
    res.json({ success: true });
  });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
