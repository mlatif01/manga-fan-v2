const express = require('express');
const router = express.Router();
const verify = require('../../middleware/verifyToken');
const ObjectId = require('mongodb').ObjectID;

// Models
const User = require('../../models/User');
const Manga = require('../../models/Manga');
const Friend = require('../../models/Friend');

/**
 * @route GET api/users/otaku/:id
 * @desc Get one username, profile, fav manga and friends list.
 * @access Private
 */
router.get('/:id', verify, async (req, res) => {
  // get request params
  const userId = req.params.id;
  const user = await User.findById(userId).select('-password'); // res.send(user);

  const userObj = {
    userId: userId,
    username: user.username,
    profile: user.profile,
    favManga: [],
    friends: [],
  };
  // get users mangas
  const manga = await Manga.findOne({ userId: userId });
  userObj.favManga = manga.mangas;
  // get users friends
  const friend = await Friend.findOne({ userId: userId });
  userObj.friends = friend.friends;
  try {
    res.send(userObj);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @route GET api/users/otaku
 * @desc Get all usernames, profiles, fav manga and friends list.
 * @access Private
 */
router.get('/', verify, async (req, res) => {
  const allUsers = await User.find();
  var arrOfUsers = [];
  allUsers.forEach((user) => {
    userObj = {
      userId: user._id,
      username: user.username,
      profile: user.profile,
      favManga: [],
      friends: [],
    };
    arrOfUsers.push(userObj);
  });
  // remove logged in user from arr - use != for type coercion
  arrOfUsers = arrOfUsers.filter((user) => user.userId != req.user._id);

  // get fav manga details
  const allFavManga = await Manga.find();

  arrOfUsers.forEach((user) => {
    allFavManga.forEach((favManga) => {
      if (user.userId.equals(favManga.userId)) {
        user.favManga = favManga.mangas;
      }
    });
  });

  // get all friends details
  const allFriends = await Friend.find();

  arrOfUsers.forEach((user) => {
    allFriends.forEach((friend) => {
      if (user.userId.equals(friend.userId)) {
        user.friends = friend.friends;
      }
    });
  });

  try {
    res.send(arrOfUsers);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
