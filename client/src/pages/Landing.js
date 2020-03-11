import React from 'react';

export default function Landing({ logo }) {
  return (
    <section className='landing'>
      <div className='landing-upper'>
        <img src='' alt='' />
      </div>
      <div className='dark-overlay'>
        <div className='landing-inner hide-sm'>
          <i className={logo}></i>
          <h1 className='text-xlg'>Manga Fan</h1>
          <p className='lead'>Connect and read Manga with other fans!</p>
        </div>
      </div>
    </section>
  );
}
