import React, { useEffect } from 'react';

import loader from '../assets/img/loader.gif';
import { AuthContext } from '../App';

import OtakuCard from '../components/OtakuCard';

const INITIAL_STATE = {
  otaku: [],
  isFetching: false,
  hasError: false,
  isViewingOtaku: false
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
    case 'VIEWING_OTAKU_PROFILE':
      return {
        ...state,
        isViewingOtaku: true
        // chapterInfo: action.payload
      };
    case 'NOT_VIEWING_OTAKU_PROFILE':
      return {
        ...state,
        isViewingOtaku: false
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

  return (
    <div className='page-content'>
      <h1>OTAKU</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop fa-1x'></i> Browse and connect with
        other manga fans!
      </p>
      <div className='otaku-content'>
        {state.otaku.map((otakuProfile, index) => (
          <OtakuCard key={index} otakuProfile={otakuProfile} />
        ))}
      </div>
    </div>
  );
}
