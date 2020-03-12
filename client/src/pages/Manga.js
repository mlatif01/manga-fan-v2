import React from 'react';

import Table from '../components/Table';

const INITIAL_STATE = {
  manga: [
    {
      mangaId: 1,
      author: 'Morikawa',
      title: 'Hajime No Ippo',
      releaseYear: 1989,
      latestChapter: 200,
      lastRead: 1
    },
    {
      mangaId: 2,
      author: 'Morikawa',
      title: 'Hajime No Ippo',
      releaseYear: 1989,
      latestChapter: 200,
      lastRead: 1
    },
    {
      mangaId: 3,
      author: 'Morikawa',
      title: 'Hajime No Ippo',
      releaseYear: 1989,
      latestChapter: 200,
      lastRead: 1
    }
  ],
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
        songs: action.payload
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
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  return (
    <div className='page-content'>
      <h1>Favourite Manga</h1>
      <Table manga={INITIAL_STATE.manga} />
    </div>
  );
}
