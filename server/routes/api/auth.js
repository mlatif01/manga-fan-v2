const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const verify = require('../../middleware/verifyToken');
const jwt = require('jsonwebtoken');

// Validation import
const {
  registerValidation,
  loginValidation
} = require('../../middleware/validation');

// User Model
const User = require('../../models/User');

/**
 * @route POST api/users/register
 * @desc Register New User
 * @access Public
 */
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validation using Joi
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if username is already in DB
  const userExists = await User.findOne({
    username: req.body.username
  });
  if (userExists) {
    console.log('Username already exists');
    return res.status(400).send('Username already exists');
  }

  // Check if email is already in DB
  const emailExists = await User.findOne({
    email: req.body.email
  });
  if (emailExists) {
    console.log('Email already exists');
    return res.status(400).send('Email already exists');
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create New User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    profile: {
      bio: '',
      instagram: ''
    }
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log('Register Error');
    res.status.send(400).send(err);
  }
  console.log('Registered');
});

/**
 * @route POST api/users
 * @desc Login User
 * @access Public
 */
router.post('/login', async (req, res) => {
  // Validate data before user is created
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the email is already in the DB
  var user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email is Not Found');

  // Chheck if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send('Email or Password is Invalid');

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, config.get('jwtSecret'));
  // res.header('auth-token', token).send({
  //   token: token
  // });
  var user = {
    id: user._id,
    username: user.username,
    email: user.email,
    profile: user.profile
  };

  res.send({ token, user });
});

/**
 * @route POST api/users/verify
 * @desc Login User
 * @access Private
 */
router.get('/verify', verify, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  return res.send(user);
});

module.exports = router;
