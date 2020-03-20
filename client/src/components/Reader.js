import React, { useState, useEffect } from 'react';
import loader from '../assets/img/loader.gif';
import getMangaChapter from '../api/getMangaChapter';
import { AuthContext } from '../App';

const INITIAL_STATE = {
  chapter: [],
  currentImg: '',
  pageIndex: 0,
  page: 1,
  isFetching: false,
  hasError: false,
  CDN: 'https://cdn.mangaeden.com/mangasimg/'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CHAPTER_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case 'FETCH_CHAPTER_SUCCESS':
      return {
        ...state,
        isFetching: false,
        chapter: action.payload.images,
        pageIndex: action.payload.images.length - 1,
        currentImg: action.payload.images[action.payload.images.length - 1][1]
      };
    case 'FETCH_CHAPTER_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        page: state.page + 1,
        pageIndex: state.pageIndex - 1,
        currentImg: state.chapter[state.pageIndex - 1][1]
      };
    case 'PREV_PAGE':
      return {
        ...state,
        page: state.page - 1,
        pageIndex: state.pageIndex + 1,
        currentImg: state.chapter[state.pageIndex + 1][1]
      };
    case 'REFRESH_PAGE':
      return {
        ...state
      };
    default:
      return state;
  }
};

export default function Reader({ chapterInfo, toggleIsReading }) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const { state: authState } = React.useContext(AuthContext);

  useEffect(() => {
    fetchChapter();
  }, [authState.token]);

  useEffect(() => {
    dispatch({
      type: 'REFRESH_PAGE'
    });
  }, [state.currentImg]);

  const fetchChapter = () => {
    dispatch({
      type: 'FETCH_CHAPTER_REQUEST'
    });
    fetch('/api/manga-eden' + `/${chapterInfo.title},${chapterInfo.lastRead}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        console.log(resJson);
        dispatch({
          type: 'FETCH_CHAPTER_SUCCESS',
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: 'FETCH_CHAPTER_FAILURE'
        });
      });
  };

  function handleRead() {
    toggleIsReading();
  }

  function handleNextPage() {
    if (state.page < state.chapter.length)
      dispatch({
        type: 'NEXT_PAGE'
      });
  }

  function handlePrevPage() {
    if (state.page > 1) {
      dispatch({
        type: 'PREV_PAGE'
      });
    }
  }

  const handleKeyPress = e => {
    console.log(e);
  };

  return (
    <div className='manga-page'>
      {state.isFetching ? (
        <img src={loader} alt='loader' />
      ) : state.isError ? (
        <span className='error'>AN ERROR HAS OCCURED</span>
      ) : (
        <div className='manga-content' onKeyPress={handleKeyPress}>
          <div className='manga-heading'>
            <button className='btn btn-warning' onClick={() => handleRead()}>
              Back
            </button>
            <h2>{`${chapterInfo.title} - Chapter: ${chapterInfo.lastRead} - Page: ${state.page}`}</h2>
          </div>
          <div className='line'></div>
          <div className='manga-inner'>
            <button className='btn btn-danger' onClick={() => handlePrevPage()}>
              Prev
            </button>
            <img src={state.CDN + state.currentImg} />
            <button
              className='btn btn-success'
              onClick={() => handleNextPage()}
            >
              Next
            </button>
          </div>
          <div className='line'></div>
        </div>
      )}
    </div>
  );
}
