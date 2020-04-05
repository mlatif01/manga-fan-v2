import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const mangaCommentGoodRequest = () =>
  toast.success('Comment Added Successfully', {
    position: toast.POSITION.RIGHT,
  });
const mangaCommentBadRequest = () => toast.error('Comment Could Not Be Added');

export default async function postMangaComment(
  title,
  chapterNumber,
  comment,
  authState
) {
  const mangaCommentData = {
    title: title,
    chapterNumber: chapterNumber,
    comment: comment,
  };

  const headerConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: JSON.parse(localStorage.getItem('token')),
    },
  };

  try {
    const res = await axios.post(
      '/api/manga/comments',
      mangaCommentData,
      headerConfig
    );
    if (res.status === 200) {
      mangaCommentGoodRequest();
      // dispatch({
      //   type: 'LOGIN',
      //   payload: res.data
      // });
    }
  } catch (err) {
    console.log(err);
    mangaCommentBadRequest();
  }
}
