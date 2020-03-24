import React from 'react';

import postManga from '../api/postManga';

export default function OtakuProfile({
  otakuProfile,
  toggleIsViewingOtakuProfile
}) {
  const handleGoBack = () => {
    console.log('Go back');
    toggleIsViewingOtakuProfile();
  };

  async function addManga(newManga) {
    await postManga(newManga);
  }

  return (
    <div className='otaku-profile'>
      <button className='btn btn-info' onClick={() => handleGoBack()}>
        Back
      </button>
      <div className='heading'>
        <div className='head'>
          <h1>{otakuProfile.username}</h1>
          <button className='btn btn-md btn-friend friend'>Add Friend</button>
        </div>
        <img
          src='https://cdn.pixabay.com/photo/2016/03/31/14/47/avatar-1292817_960_720.png'
          alt='user-avatar'
          className='avatar'
        />
        <h2 className='text-md'>Bio</h2>
        <div className='line'></div>
        {<p className='lead'>{otakuProfile.profile.bio}</p>}
        <div className='social'>
          <button className='btn btn-primary message'>Send Message</button>
          <a href={otakuProfile.profile.instagram} className='btn insta'>
            <i className='fab fa-instagram fa-4x'></i>
          </a>
        </div>
      </div>
      <div className='otaku-profile-content'>
        <div className='fav-manga'>
          <h2 className='text-md'>Manga</h2>
          <div className='line'></div>
          {otakuProfile.favManga.map((manga, index) => (
            <li key={manga.title}>
              <span>
                {' '}
                <i className='fas fa-book-reader'></i>
                <p className='lead'>{manga.title}</p>
                <button
                  onClick={() => addManga(manga.title)}
                  className='btn btn-primary'
                >
                  Add Manga
                </button>
              </span>
            </li>
          ))}
        </div>
        {/* CHANGE TO FRIENDS LIST*/}
        <div className='friends-list'>
          <h2 className='text-md'>Friends</h2>
          <div className='line'></div>
          {otakuProfile.favManga.map((manga, index) => (
            <li key={manga.author}>
              <span>
                {' '}
                <i class='fas fa-user'></i>
                <p className='lead'>{manga.author}</p>
              </span>
              <button className='btn btn-friend'>Add Friend</button>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}