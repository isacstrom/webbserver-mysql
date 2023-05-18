const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'fake lösenord',
  database: 'isse'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database with ID:', db.threadId);
});

router.get('/highscore', (req, res) => {
  db.query('SELECT username, score FROM users ORDER BY score DESC LIMIT 100', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving highscores:', error.stack);
      res.send('Error retrieving highscores. Please try again.');
    } else {
      const highscoreList = results.map((user) => {
        return `<li>${user.username}: ${user.score}</li>`;
      }).join('');
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Highscores</title>
        </head>
        <body>
          <h1>Highscores</h1>
          <ul>${highscoreList}</ul>
        </body>
        </html>
      `;
      res.send(html);
    }
  });
});

module.exports = router;
