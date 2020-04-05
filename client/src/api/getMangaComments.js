import React from 'react';
import axios from 'axios';

// Fetch Manga List only once
export default async function getMangaComments(title, chapterNumber) {
  const headerConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token')),
    },
  };

  try {
    // Fetch manga list
    const response = await axios.get(
      '/api/manga/comments' + `/${title},${chapterNumber}`,
      headerConfig
    );
    const data = await response;
    console.log('received manga comments data');
    return data;
  } catch (err) {
    console.log(err);
  }
}
