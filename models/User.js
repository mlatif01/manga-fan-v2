const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  profile: {
    bio: {
      type: String,
      required: false,
      min: 0,
      max: 255
    },
    instagram: {
      type: String,
      required: false,
      min: 0,
      max: 255
    }
  }
});

module.exports = mongoose.model('User', userSchema);
