import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// HTTP Request Methods for Manga Eden Api
var baseMangaListURL = 'https://www.mangaeden.com/api/list/0';

// Fetch Manga List only once
export default async function getMangaChapter(chapterInfo) {
  const headerConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  };

  try {
    // Fetch manga list
    const response = await axios.get(
      '/api/manga-eden' +  `/${chapterInfo.title},${chapterInfo.chapter}`,
      headerConfig
    );
    const data = await response.json();

    console.log('received manga chapter data');
    return data;
  } catch (err) {
    console.log(err);
  }
}
