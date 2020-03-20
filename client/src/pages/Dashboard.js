import React from 'react';

import ProfileCard from '../components/ProfileCard';

export default function Dashboard({ user }) {
  // const username = user.username;
  const avatar = {
    marginTop: '2rem'
  };
  return (
    <div className='page-content'>
      {/* <h1>Welcome {username.charAt(0).toUpperCase() + username.slice(1)}</h1> */}
      <h1 className='text-lg'>Welcome User</h1>
      <i className='fas fa-user fa-8x' style={avatar}></i>
      <div className='dashboard'>
        <div className='friends card'>FRIENDS GO HERE</div>
        <div className='manga card'>TOP 3 FAV MANGA GO HERE</div>
        <ProfileCard user={user}/>
      </div>
    </div>
  );
}
