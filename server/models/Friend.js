const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
  friends: [
    {
      name: {
        type: String,
        required: true,
        min: 1,
        max: 255
      },
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
      }
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Friend', FriendSchema);
