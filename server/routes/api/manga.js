const express = require('express');
const router = express.Router();
const config = require('config');
const verify = require('../../middleware/verifyToken');

/**
 * @route GET api/manga
 * @desc Register New User
 * @access Public
 */
router.get('/', (req, res) => {
  const manga = [
    {
      mangaId: 1,
      author: 'Morikawa',
      title: 'Hajime No Ippo',
      releaseYear: 1989,
      latestChapter: 200,
      lastRead: 1
    },
    {
      mangaId: 2,
      author: 'Morikawa',
      title: 'Hajime No Ippo',
      releaseYear: 1989,
      latestChapter: 200,
      lastRead: 1
    },
    {
      mangaId: 3,
      author: 'Morikawa',
      title: 'Hajime No Ippo',
      releaseYear: 1989,
      latestChapter: 200,
      lastRead: 1
    }
  ];
  res.send(manga);
});

module.exports = router;
