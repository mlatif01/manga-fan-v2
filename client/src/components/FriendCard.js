import React, { useEffect, useState } from 'react';

import getUsersFriends from '../api/getUsersFriends';
import getOtakuProfile from '../api/getOtakuProfile';
import { useHistory, Redirect, Switch, Route } from 'react-router-dom';

import OtakuProfile from '../components/OtakuProfile';

export default function FriendCard({ user }) {
  const [friends, setFriends] = useState(['']);
  const [viewProfile, setViewProfile] = useState(false);
  const [friendOtakuProfile, setFriendOtakuProfile] = useState('');

  let history = useHistory();

  // Fetch friends when the state of the token is updated
  useEffect(() => {
    getUsersFriends().then(res => {
      console.log(res.data);
      setFriends(res.data);
    });
  }, []);

  const viewOtakuProfile = friendId => {
    // fetch otaku profile
    getOtakuProfile(friendId).then(res => {
      console.log(res.data);
      setFriendOtakuProfile(res.data);
      setViewProfile(true);
    });
  };

  return (
    <React.Fragment>
      {!viewProfile ? (
        <div className='friends card'>
          <h2 className='text-md'>Friends</h2>
          <div className='line'></div>
          {friends.slice(0, 5).map((friend, index) => (
            <li key={index} onClick={() => viewOtakuProfile(friend.friendId)}>
              <span>
                {' '}
                <i className='fas fa-user'></i>
                <p className='lead'>{friend.name}</p>
              </span>
            </li>
          ))}
        </div>
      ) : (
        <React.Fragment>
          <Redirect to={`/otaku/${friendOtakuProfile.username}`} />
          <Switch>
            <Route
              exact
              path={`/otaku/:otakuId`}
              render={props => (
                <OtakuProfile
                  {...props}
                  otakuProfile={friendOtakuProfile}
                  toggleIsViewingOtakuProfile={true}
                />
              )}
            />
          </Switch>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
