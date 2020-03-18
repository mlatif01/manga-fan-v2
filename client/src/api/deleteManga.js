import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const mangaGoodRequest = () =>
  toast.success('Manga Deleted Successfully', {
    position: toast.POSITION.RIGHT
  });
const mangaBadRequest = () => toast.error('Manga Could Not Be Deleted');

export default async function deleteManga(mangaId, authState) {
  const mangaData = {
    mangaId: mangaId
  };

  console.log(mangaData);
  const headerConfig = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: JSON.parse(localStorage.getItem('token'))
    },
    // Serialize json data
    data: JSON.stringify({
      mangaId: mangaId
    })
  };

  try {
    const res = await axios.delete('/api/manga', headerConfig);
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
