const express = require('express');
const router = express.Router();
const verify = require('../../middleware/verifyToken');
const ObjectId = require('mongodb').ObjectID;

// Models
const User = require('../../models/User');
const Friend = require('../../models/Friend');

/**
 * @route GET api/users/friends
 * @desc Get User's Manga List
 * @access Private
 */
router.get('/', verify, async (req, res) => {
  const friend = await Friend.findOne({ userId: req.user._id });
  if (friend) {
    res.send(friend.friends);
  } else {
    res.send([]);
  }
});

/**
 * @route POST api/user/friends
 * @desc Add Friend Entry to User's Friend List
 * @access Private
 */

router.post('/', verify, async (req, res) => {
  console.log('friends');
  let flag = true;

  // Get User Details
  const user = await User.findById(req.user);

  // // // Validate the data before we create a user
  // const { error } = friendValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user has friends collections entry
  const FriendEntryExists = await Friend.findOne({ userId: req.user._id });

  if (FriendEntryExists) {
    FriendEntryExists.friends.forEach(entry => {
      console.log(entry);
      // check if user is trying to add himself
      if (req.user._id.toString() === req.body.friendId) {
        console.log('Cannot add yourself to the list');
        flag = false;
        return res.status(400).send('Cannot Add Yourself to the Friends List');
      }
      // check if friend is already in the list
      if (entry.name.toLowerCase() === req.body.name.toLowerCase()) {
        console.log('Friend Already Here!');
        flag = false;
        return res.status(400).send('Friend Already In List');
      }
    });
  }

  // store the data to db
  if (!FriendEntryExists && flag) {
    // Create a new friend entry
    const entry = new Friend({
      userId: user._id
    });
    entry.friends.push({
      name: req.body.name,
      friendId: new ObjectId(req.body.friendId)
    });
    console.log('New Friend Entry');
    try {
      const savedEntry = await entry.save();
      res.send({ friendId: entry.id });
    } catch (err) {
      res.status(400).send(err);
    }
  } else if (FriendEntryExists && flag) {
    // add to existing entry
    console.log('Existing Friend Entry');
    const entry = FriendEntryExists;
    entry.friends.push({
      name: req.body.name,
      friendId: new ObjectId(req.body.friendId)
    });
    try {
      const savedEntry = await entry.save();
      res.send({ friendId: entry.id });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
});

module.exports = router;
