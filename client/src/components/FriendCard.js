import React, { useEffect, useState } from 'react';

import getUsersFriends from '../api/getUsersFriends';
import { useHistory } from 'react-router-dom';

export default function FriendCard({ user }) {
  const [friends, setFriends] = useState(['']);
  let history = useHistory();

  // Fetch friends when the state of the token is updated
  useEffect(() => {
    getUsersFriends().then(res => {
      console.log(res.data);
      setFriends(res.data);
    });
  }, []);

  const viewOtakuProfile = () => {
    history.push('/otaku');
  };

  return (
    <div className='friends card'>
      <h2 className='text-md'>Friends</h2>
      <div className='line'></div>
      {friends.slice(0, 5).map((friend, index) => (
        <li key={index} onClick={() => viewOtakuProfile()}>
          <span>
            {' '}
            <i className='fas fa-user'></i>
            <p className='lead'>{friend.name}</p>
          </span>
        </li>
      ))}
    </div>
  );
}
