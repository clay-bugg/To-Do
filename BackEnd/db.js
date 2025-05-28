const sqlite3 = require('sqlite3').verbose();

// Just open your existing database file!
const db = new sqlite3.Database('./todo.db', (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  }
  else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;