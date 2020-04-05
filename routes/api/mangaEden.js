const router = require('express').Router();
const verify = require('../../middleware/verifyToken');
const fetch = require('node-fetch');

var baseMangaListURL = 'https://www.mangaeden.com/api/list/0';
var baseMangaChapterURL = 'https://www.mangaeden.com/api/manga/';
var baseMangaPagesURL = 'https://www.mangaeden.com/api/chapter/';

/**
 * @route GET api/manga-eden/names
 * @desc Get User's Manga List
 * @access Private
 */
router.get('/names', verify, async (req, res) => {
  const mangasResponse = await fetch(baseMangaListURL);
  const mangasData = await mangasResponse.json();
  let mangaNamesArr = [];
  mangasData.manga.forEach(manga => {
    mangaNamesArr.push(manga['t']);
  });
  mangaNamesArr = mangaNamesArr.sort((a, b) => {
    return a.localeCompare(b);
  });
  res.send(mangaNamesArr);
});

// GET - user manga list
router.get('/:info', verify, async (req, res) => {
  // get request params
  const info = req.params.info.split(',');
  const title = info[0];
  const chapter = info[1];
  let mangaId = '';
  let chapterId = '';
  console.log(title, chapter);

  // get full manga list
  const listResponse = await fetch(baseMangaListURL);
  let listData = await listResponse.json();

  // get manga id
  listData.manga.forEach(manga => {
    if (manga.t.toUpperCase() === title.toUpperCase()) {
      mangaId = manga.i;
    }
  });

  console.log(mangaId);
  // use manga id to find chapter id
  const mangaResponse = await fetch(baseMangaChapterURL + mangaId);
  const mangaData = await mangaResponse.json();

  // get chapter id from chapters array of manga data
  mangaData.chapters.forEach(chapArr => {
    if (chapArr[0] === parseInt(chapter)) {
      chapterId = chapArr[3];
    }
  });

  // use chapter id to find chapter pages
  const chapterResponse = await fetch(baseMangaPagesURL + chapterId);
  const chapterData = await chapterResponse.json();

  res.json(chapterData);
});

module.exports = router;
