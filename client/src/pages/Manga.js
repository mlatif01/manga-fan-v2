import React, { useEffect } from 'react';

import Table from '../components/Table';
import { AuthContext } from '../App';

const INITIAL_STATE = {
  manga: [],
  isFetching: false,
  hasError: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_MANGA_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case 'FETCH_MANGA_SUCCESS':
      return {
        ...state,
        isFetching: false,
        manga: action.payload
      };
    case 'FETCH_MANGA_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    default:
      return state;
  }
};

export default function Manga() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({
      type: 'FETCH_MANGA_REQUEST'
    });
    fetch('/api/manga', {
      headers: {
        Authorization: `Bearer ${authState.token}`
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
          type: 'FETCH_MANGA_SUCCESS',
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: 'FETCH_MANGA_FAILURE'
        });
      });
  }, [authState.token]);

  return (
    <div className='page-content'>
      <h1>Favourite Manga</h1>
      {state.isFetching ? (
        <span className='error'>LOADING...</span>
      ) : state.hasError ? (
        <span className='error'>AN ERROR HAS OCCURED</span>
      ) : (
        <Table manga={state.manga} />
      )}
    </div>
  );
}
