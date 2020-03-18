import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const mangaGoodRequest = () =>
  toast.success('Manga Added Successfully', {
    position: toast.POSITION.RIGHT
  });
const mangaBadRequest = () => toast.error('Manga Could Not Be Added');

export default async function postManga(title, authState) {
  const mangaData = {
    author: 'undefined',
    title: title,
    releaseYear: 1900,
    latestChapter: 1,
    lastRead: 1
  };

  const headerConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: JSON.parse(localStorage.getItem('token'))
    }
  };

  try {
    const res = await axios.post('/api/manga', mangaData, headerConfig);
    if (res.status === 200) {
      mangaGoodRequest();
      // dispatch({
      //   type: 'LOGIN',
      //   payload: res.data
      // });
    }
  } catch (err) {
    console.log(err);
    mangaBadRequest();
  }
}
