const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

/**
 * @route POST api/users
 * @desc Register New User
 * @access Public
 */
router.post('/', (req, res) => {
  res.send('Register');
});

module.exports = router;
