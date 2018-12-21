const express = require('express');
const router = express.Router();

// logout user
router.get('/', async (req, res) => {
  if (!('login-token' in req.cookies)) return res.json('User is not logged in!');

  res.clearCookie('login-token').json('Successfully logged out.');
});

module.exports = router;
