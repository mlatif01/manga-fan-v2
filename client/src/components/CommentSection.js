import React, { useState, useEffect } from 'react';
import axios from 'axios';

import postMangaComment from '../api/postMangaComment';
import getMangaComments from '../api/getMangaComments';

const INITIAL_STATE = {
  comment: '',
  comments: [],
};

export default function CommentSection({ chapterInfo }) {
  const [showComments, setShowComments] = useState(false);
  const [values, setValues] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getMangaComments(chapterInfo.title, chapterInfo.lastRead).then(
      (resJson) => {
        setValues({
          ...values,
          comments: resJson.data,
        });
      }
    );
  }, []);

  // const fetchComments = () => {
  //   // fetch comments left by friends, for this chapter
  //   getMangaComments(chapterInfo.title, chapterInfo.lastRead);
  // };

  const submitComment = () => {
    // submit comment to db
    postMangaComment(chapterInfo.title, chapterInfo.lastRead, values.comment);
    setValues({
      ...values,
      comment: '',
    });
  };

  const toggleComments = () => {
    showComments ? setShowComments(false) : setShowComments(true);
  };
  return (
    <div className='manga-comment-section'>
      {!showComments ? (
        <button onClick={toggleComments} className='toggle-show btn btn-info'>
          Show Comments
        </button>
      ) : (
        <React.Fragment>
          <button onClick={toggleComments} className='toggle-show btn btn-info'>
            {' '}
            Hide Comments{' '}
          </button>

          <div className='comments'>
            {values.comments.map((commentData, index) => (
              <React.Fragment>
                <div className='line'></div>
                <div className='comment-card'>
                  <h2 className='username'>{commentData.username}</h2>
                  <img
                    src='https://cdn.pixabay.com/photo/2016/03/31/14/47/avatar-1292817_960_720.png'
                    alt=''
                  />
                  <p className='lead comment'>{commentData.comment}</p>
                  <p className='date'>
                    {commentData.date.slice(0, 10)} |{' '}
                    {commentData.date.slice(11, 19)}
                  </p>
                </div>
                <div className='line'></div>
              </React.Fragment>
            ))}
          </div>
          <textarea
            onChange={handleChange}
            value={values.comment}
            name='comment'
            placeholder='Comment and let your friends know what you think about this chapter!'
            className='comment-area'
            cols='30'
            rows='10'
          ></textarea>
          <button
            className='btn btn-primary submit-comment'
            onClick={() =>
              submitComment(chapterInfo.title, chapterInfo.lastRead)
            }
          >
            Submit Comment
          </button>
        </React.Fragment>
      )}
    </div>
  );
}
