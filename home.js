const express = require('express');
const session = require('express-session');
const router = express.Router();
router.use(session({
  secret: 'nyckel',
  resave: false,
  saveUninitialized: false
}));
// kolla så dem kan komma in på deras profil 
router.get('/home', (req, res) => {
  const users = req.session.users;
  if (!req.session.users) {
    req.session.users = [];
  } 
  let buttonsHtml = '';

  if (users) {
    buttonsHtml = `
      <p>View your <a href="/profile">profile</a></p>
      <p>View the <a href="/highscore">highscores</a></p>
      <p><a href="/logout">Logout</a></p>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Home</title>
    </head>
    <body>
      <h1>Welcome to the Home Page</h1>
      <p>Play Snake <a href="https://www.itgwebb.se/klass/webb2_g2/isac/snake.html/snake.html">here</a></p>
      ${buttonsHtml}
    </body>
    </html>
  `;
  res.send(html);
});

module.exports = router;
