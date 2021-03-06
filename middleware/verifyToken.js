const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(400).send('Access Denied');

  try {
    const verified = jwt.verify(token, config.get('jwtSecret'));
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
