const express = require('express');
const router = express.Router();

// logout user
router.get('/', async (req, res) => {
  if (!('login-token' in req.cookies)) return res.send('User is not logged in!');

  res.clearCookie('login-token').send('Successfully logged out.');
});

module.exports = router;
