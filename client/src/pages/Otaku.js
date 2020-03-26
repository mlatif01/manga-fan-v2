import React, { useEffect } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import loader from '../assets/img/loader.gif';
import { AuthContext } from '../App';

import OtakuCard from '../components/OtakuCard';
import OtakuProfile from '../components/OtakuProfile';

const INITIAL_STATE = {
  otaku: [],
  isFetching: false,
  hasError: false,
  isViewingOtakuProfile: false,
  otakuProfile: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_OTAKU_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case 'FETCH_OTAKU_SUCCESS':
      return {
        ...state,
        isFetching: false,
        otaku: action.payload
      };
    case 'FETCH_OTAKU_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    case 'VIEW_OTAKU_PROFILE':
      return {
        ...state,
        isViewingOtakuProfile: true,
        otakuProfile: action.payload
      };
    case 'NOT_VIEW_OTAKU_PROFILE':
      return {
        ...state,
        isViewingOtakuProfile: false
      };
    default:
      return state;
  }
};

export default function Otaku() {
  // const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const { state: authState } = React.useContext(AuthContext);

  const fetchOtaku = () => {
    dispatch({
      type: 'FETCH_OTAKU_REQUEST'
    });
    fetch('/api/users/otaku', {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        console.log(resJson);
        dispatch({
          type: 'FETCH_OTAKU_SUCCESS',
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: 'FETCH_OTAKU_FAILURE'
        });
      });
  };

  useEffect(() => {
    fetchOtaku();
  }, [authState.token]);

  // Toggles Table and Reader component
  const toggleIsViewingOtakuProfile = otakuProfile => {
    !state.isViewingOtakuProfile
      ? dispatch({
          type: 'VIEW_OTAKU_PROFILE',
          payload: otakuProfile
        })
      : dispatch({
          type: 'NOT_VIEW_OTAKU_PROFILE',
          payload: otakuProfile
        });
  };

  return (
    <div className='page-content'>
      <h1>OTAKU</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop fa-1x'></i> Browse and connect with
        other manga fans!
      </p>
      {state.isFetching ? (
        <img className='loader' src={loader} alt='loader' />
      ) : state.hasError ? (
        <span className='error'>AN ERROR HAS OCCURED</span>
      ) : !state.isViewingOtakuProfile ? (
        <React.Fragment>
          <div className='otaku-content'>
            {state.otaku.map((otakuProfile, index) => (
              <div
                key={index}
                className='otaku-card'
                onClick={() => toggleIsViewingOtakuProfile(otakuProfile)}
              >
                <OtakuCard otakuProfile={otakuProfile} />
              </div>
            ))}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Redirect to={`/otaku/${state.otakuProfile.username}`} />
          <Switch>
            <Route
              exact
              path={`/otaku/:otakuId`}
              render={props => (
                <OtakuProfile
                  {...props}
                  otakuProfile={state.otakuProfile}
                  toggleIsViewingOtakuProfile={toggleIsViewingOtakuProfile}
                />
              )}
            />
          </Switch>
        </React.Fragment>
      )}
    </div>
  );
}
