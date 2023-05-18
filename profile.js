const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'fake lösenord för videon',
    database: 'isse'
  });
  // kolla så dem är inloggade
router.get('/profile', (req, res) => {
  const email = req.session.email;
  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
    if (error) {
      console.error('Error retrieving user profile:', error.stack);
      res.send('Error retrieving user profile. Please try again.');
    } else {
      if (results.length > 0) {
        const user = results[0];
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Profile</title>
          </head>
          <body>
            <h1>Profile</h1>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Highscore: ${user.score}</p>
          </body>
          </html>
        `;
        res.send(html);
      } else {
        res.send('User profile not found.');
      }
    }
  });
});

module.exports = router;
