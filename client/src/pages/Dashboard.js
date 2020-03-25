import React from 'react';

import ProfileCard from '../components/ProfileCard';
import MangaCard from '../components/MangaCard';
import FriendCard from '../components/FriendCard';

export default function Dashboard({ user }) {
  // const username = user.username;
  const avatar = {
    marginTop: '2rem'
  };
  return (
    <div className='page-content'>
      {/* <h1 className='text-lg'>
        Welcome {username.charAt(0).toUpperCase() + username.slice(1)}
      </h1> */}
      <h1 className='text-lg'>Welcome User</h1>
      <i className='fas fa-user fa-8x' style={avatar}></i>
      <div className='dashboard'>
        <FriendCard user={user} />
        <MangaCard user={user} />
        <ProfileCard user={user} />
      </div>
    </div>
  );
}
