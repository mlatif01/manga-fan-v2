import React, { useEffect, useState } from 'react';

import getUsersManga from '../api/getUsersManga';

export default function MangaCard({ user }) {
  const [favManga, setFavManga] = useState(['']);
  // Fetch manga when the state of the token is updated
  useEffect(() => {
    getUsersManga().then(res => {
      console.log(res.data);
      setFavManga(res.data);
    });
  }, []);

  return (
    <div className='manga card'>
      <h2 className='text-md'>Manga</h2>
      <div className='line'></div>
      {favManga.slice(0, 5).map((manga, index) => (
        <li key={index}>
          <span>
            {' '}
            <i className='fas fa-book-reader'></i>
            <p className='lead'>{manga.title}</p>
          </span>
        </li>
      ))}
    </div>
  );
}
