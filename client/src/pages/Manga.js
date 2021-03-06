import React, { useState, useEffect } from 'react';

import Table from '../components/Table';
import Reader from '../components/Reader';
import CommentSection from '../components/CommentSection';
import loader from '../assets/img/loader.gif';
import { AuthContext } from '../App';
import { ThemeContext } from '../App';

const INITIAL_STATE = {
  manga: [],
  isFetching: false,
  hasError: false,
  isReading: false,
  chapterInfo: {
    title: '',
    chapter: 0,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_MANGA_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case 'FETCH_MANGA_SUCCESS':
      return {
        ...state,
        isFetching: false,
        manga: action.payload,
      };
    case 'FETCH_MANGA_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case 'READ_MANGA':
      return {
        ...state,
        isReading: true,
        chapterInfo: action.payload,
      };
    case 'NOT_READING_MANGA':
      return {
        ...state,
        isReading: false,
      };
    default:
      return state;
  }
};

export default function Manga() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const { theme, setTheme } = React.useContext(ThemeContext);

  const fetchManga = () => {
    dispatch({
      type: 'FETCH_MANGA_REQUEST',
    });
    fetch('/api/manga', {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token')),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((resJson) => {
        console.log(resJson);
        dispatch({
          type: 'FETCH_MANGA_SUCCESS',
          payload: resJson,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: 'FETCH_MANGA_FAILURE',
        });
      });
  };

  // Fetch manga when the state of the token is updated
  useEffect(() => {
    fetchManga();
  }, [authState.token]);

  // used to refresh parent component when Table is updated
  const triggerParentDispatch = () => {
    fetchManga();
    console.log('fetching');
  };

  // Toggles Table and Reader component
  const toggleIsReading = (mangaObj) => {
    !state.isReading
      ? dispatch({
          type: 'READ_MANGA',
          payload: mangaObj,
        })
      : dispatch({
          type: 'NOT_READING_MANGA',
          payload: {},
        });
  };

  return (
    <div className={theme}>
      <div className='page-content'>
        <button
          className='btn btn-theme'
          onClick={() =>
            theme === 'light' ? setTheme('dark') : setTheme('light')
          }
        >
          {theme === 'light' ? '🔦' : '💡'}
        </button>
        {state.isFetching ? (
          <img className='loader' src={loader} alt='loader' />
        ) : state.hasError ? (
          <span className='error'>AN ERROR HAS OCCURED</span>
        ) : !state.isReading ? (
          <React.Fragment>
            <h2 className='manga-h2'>Read Your Favourite Manga</h2>
            <Table
              triggerParentDispatch={triggerParentDispatch}
              toggleIsReading={toggleIsReading}
              mangas={state.manga}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Reader
              toggleIsReading={toggleIsReading}
              chapterInfo={state.chapterInfo}
            />
            <CommentSection chapterInfo={state.chapterInfo} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
