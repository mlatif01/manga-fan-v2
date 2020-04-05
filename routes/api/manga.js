const express = require('express');
const router = express.Router();
const config = require('config');
const fetch = require('node-fetch');
const verify = require('../../middleware/verifyToken');

// Models
const User = require('../../models/User');
const Manga = require('../../models/Manga');
const Friend = require('../../models/Friend');
const MangaComments = require('../../models/MangaComments');
// Validation
const { mangaValidation } = require('../../middleware/validation');

// Assist Function
// Gets manga details for fav manga list
async function getFullMangaDetails(title) {
  const baseMangaListURL = 'https://www.mangaeden.com/api/list/0';
  const baseMangaChapterURL = 'https://www.mangaeden.com/api/manga/';
  const baseMangaPagesURL = 'https://www.mangaeden.com/api/chapter/';
  const mangaInfo = {
    author: undefined,
    title: undefined,
    releaseYear: undefined,
    latestChapter: undefined,
    lastRead: 1,
  };

  // used to find chapters and latest chapter number
  let mangaId = '';

  // get full manga list
  const listResponse = await fetch(baseMangaListURL);
  let listData = await listResponse.json();

  // get manga info and assign to mangaInfo obj
  listData.manga.forEach((manga) => {
    if (manga.t.toUpperCase() === title.toUpperCase()) {
      mangaInfo.title = manga.t;
      mangaId = manga.i;
    }
  });

  // use manga id to find chapter id - we need this to find latest chapter
  const mangaResponse = await fetch(baseMangaChapterURL + mangaId);
  const mangaData = await mangaResponse.json();

  // get correct manga data and store in manga obj
  mangaInfo.author = mangaData.author;
  mangaInfo.releaseYear = mangaData.released;
  mangaInfo.latestChapter = mangaData.chapters_len;

  console.log(mangaInfo);
  return mangaInfo;
}

/**
 * @route GET api/manga
 * @desc Get User's Manga List
 * @access Private
 */
router.get('/', verify, async (req, res) => {
  const manga = await Manga.findOne({ userId: req.user._id });
  if (manga) {
    res.send(manga.mangas);
  } else {
    res.send([]);
  }
});

/**
 * @route POST api/manga
 * @desc Add Manga Entry to User's List
 * @access Private
 */
router.post('/', verify, async (req, res) => {
  console.log(req.body);
  let flag = true;

  // Get User Details
  const user = await User.findById(req.user);

  // // Validate the data before we create a user
  const { error } = mangaValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user has fav manga collections entry
  const MangaExists = await Manga.findOne({ userId: req.user._id });

  if (MangaExists) {
    MangaExists.mangas.forEach((entry) => {
      if (entry.title.toLowerCase() === req.body.title.toLowerCase()) {
        console.log('Manga Already Here!');
        flag = false;
        return res.status(400).send('Manga Already In List');
      }
    });
  }

  // get full manga details from Manga Eden API
  const manga = await getFullMangaDetails(req.body.title);

  // store the data to db
  if (!MangaExists && flag) {
    // Create a new fav manga entry
    const entry = new Manga({
      userId: user._id,
    });
    entry.mangas.push(manga);
    console.log('New Entry ');
    try {
      const savedEntry = await entry.save();
      res.send({ ID: entry.id });
    } catch (err) {
      res.status(400).send(err);
    }
  } else if (MangaExists && flag) {
    // add to existing entry
    console.log('Existing Entry');
    const entry = MangaExists;
    entry.mangas.push(manga);
    try {
      const savedEntry = await entry.save();
      res.send({ mangaID: entry.id });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
});

/**
 * @route DELETE api/manga
 * @desc Delete Manga Entry from User's List
 * @access Private
 */
router.delete('/', verify, async (req, res) => {
  console.log(req.body);
  // Checking if the user has fav manga entry
  const entry = await Manga.findOne({ userId: req.user._id });
  const mangaArr = entry.mangas;
  try {
    mangaArr.pull({ _id: req.body.mangaId });
    entry.save();
    res.send({ mangaId: entry.id });
    console.log('Deleted Manga Successfully');
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/**
 * @route PUT api/manga
 * @desc Edit Manga Last Read from Manga Entry
 * @access Private
 */
router.put('/', verify, async (req, res) => {
  try {
    const entry = await Manga.updateOne(
      // match criteria
      {
        userId: req.user._id,
        mangas: { $elemMatch: { _id: req.body.mangaId } },
      },

      // update first match
      {
        $set: {
          'mangas.$.lastRead': req.body.newLastRead,
        },
      }
    );
    res.send({ mangaId: req.body.mangaId });
    console.log('manga edited successfully');
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/**
 * @route POST api/manga/comments
 * @desc Add comment to specific chapter
 * @access Private
 */
router.post('/comments', verify, async (req, res) => {
  // the body will have - title, chapterNumber
  console.log(req.body);
  let flag = true;

  // Get User Details
  const user = await User.findById(req.user);

  // Checking if the user has manga comments collections entry
  const MangaCommentsExists = await MangaComments.findOne({
    title: req.body.title.toLowerCase(),
    chapterNumber: req.body.chapterNumber,
  });

  console.log(MangaCommentsExists);

  const mangaCommentObj = {
    userId: req.user._id,
    comment: req.body.comment,
  };

  // store the data to db
  if (!MangaCommentsExists) {
    // Create a new manga comments entry
    const entry = new MangaComments({
      title: req.body.title.toLowerCase(),
      chapterNumber: req.body.chapterNumber,
    });
    entry.comments.push(mangaCommentObj);
    console.log('New Manga Comment Entry');
    try {
      const savedEntry = await entry.save();
      res.send({ mangaCommentId: entry.id });
    } catch (err) {
      res.status(400).send(err);
    }
  } else if (MangaCommentsExists) {
    // add to existing entry
    console.log('Existing Manga Comment Entry');
    const entry = MangaCommentsExists;
    entry.comments.push(mangaCommentObj);
    try {
      const savedEntry = await entry.save();
      res.send({ mangaCommentId: entry.id });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
});

/**
 * @route GET api/manga/comments
 * @desc Retrieve comments left by friends for specific chapter
 * @access Private
 */
router.get('/comments/:info', verify, async (req, res) => {
  // get request params
  const info = req.params.info.split(',');
  const title = info[0].toLowerCase();
  const chapterNumber = info[1];
  const friend = await Friend.findOne({ userId: req.user._id });
  const mangaCommentsEntry = await MangaComments.find({
    title: title,
    chapterNumber: chapterNumber,
  });
  const commentsArr = [];
  // find comments objects only for friends
  if (mangaCommentsEntry[0]) {
    mangaCommentsEntry[0].comments.forEach((commentEntry) => {
      friend.friends.forEach((friend) => {
        if (friend.friendId.toString() === commentEntry.userId.toString()) {
          commentsArr.push({
            username: friend.name,
            comment: commentEntry.comment,
            date: commentEntry.comment_date,
          });
        }
      });
    });
  }

  if (commentsArr) {
    res.send(commentsArr);
  } else {
    res.send([]);
  }
});

module.exports = router;
