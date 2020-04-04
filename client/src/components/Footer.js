import React from 'react';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <p className='footer-copy'>
          &copy; Copyright MangaFan 2020{' | '}
          <a className='footer-eden' href='https://www.mangaeden.com/api/'>
            Powered By Manga Eden API
          </a>
        </p>
      </div>
    </div>
  );
}
