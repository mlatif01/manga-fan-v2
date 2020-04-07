import React, { useEffect, useState } from 'react';

import getUsersFriends from '../api/getUsersFriends';
import getOtakuProfile from '../api/getOtakuProfile';
import { useHistory, Redirect, Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from '../App';

import OtakuProfile from '../components/OtakuProfile';

export default function FriendCard({ user }) {
  const [friends, setFriends] = useState(['']);
  const [viewProfile, setViewProfile] = useState(false);
  const [friendOtakuProfile, setFriendOtakuProfile] = useState('');
  const { state: authState, handleSetOtakuProfile } = React.useContext(
    AuthContext
  );

  let history = useHistory();

  // Fetch friends on start
  useEffect(() => {
    getUsersFriends().then((res) => {
      console.log(res.data);
      setFriends(res.data);
    });
  }, []);

  const viewOtakuProfileOld = (friendId) => {
    // fetch otaku profile
    getOtakuProfile(friendId).then((res) => {
      console.log(res.data);
      setFriendOtakuProfile(res.data);
      setViewProfile(true);
    });
  };

  const viewOtakuProfile = (friendId) => {
    // fetch otaku profile
    getOtakuProfile(friendId).then((res) => {
      console.log(res.data);
      setFriendOtakuProfile(res.data);
      handleSetOtakuProfile(res.data);
      history.push('/dashboard');
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
            <React.Fragment key={index}>
              <li key={index} onClick={() => viewOtakuProfile(friend.friendId)}>
                <span>
                  {' '}
                  <i className='fas fa-user'></i>
                  <p className='lead'>{friend.name}</p>
                </span>
              </li>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <React.Fragment>
          <Switch>
            <Route
              exact
              path={`/dashboard`}
              render={() => (
                <Redirect to={`/otaku/${friendOtakuProfile.username}`} />
              )}
            />
            {/* <Route
              exact
              path={`/otaku/:otakuId`}
              render={props => (
                <OtakuProfile
                  {...props}
                  otakuProfile={friendOtakuProfile}
                  toggleIsViewingOtakuProfile={true}
                />
              )}
            /> */}
          </Switch>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
