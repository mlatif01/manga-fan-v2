import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const mangaGoodRequest = () =>
  toast.success('Edited Successfully', {
    position: toast.POSITION.RIGHT
  });
const mangaBadRequest = () => toast.error('Manga Could Not Be Edited');

export default async function editLastRead(lastRead, mangaId, authState) {
  const mangaData = {
    mangaId: mangaId,
    newLastRead: +lastRead
  };

  console.log(mangaData);

  const headerConfig = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: JSON.parse(localStorage.getItem('token'))
    }
  };

  try {
    const res = await axios.put('/api/manga', mangaData, headerConfig);
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
