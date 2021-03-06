import React from 'react';

export default function OtakuCard({ otakuProfile }) {
  return (
    <div className='btn card'>
      <div className='otaku-card-content'>
        <div>
          <img
            src='https://cdn.pixabay.com/photo/2016/03/31/14/47/avatar-1292817_960_720.png'
            alt='otaku-img'
          />
          <h2>{otakuProfile.username}</h2>
        </div>

        <div className='otaku-manga'>
          {' '}
          {otakuProfile.favManga.slice(0, 4).map((manga, index) => (
            <li key={index}>
              <i className='fas fa-book-reader'></i>
              {manga.title}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
