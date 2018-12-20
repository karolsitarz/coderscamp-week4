const jwt = require('jsonwebtoken');

module.exports = function auth (req, res, next) {
  const token = req.cookies['login-token'];
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secretKey');
      req.userID = decoded._id;
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  }

  next();
};
