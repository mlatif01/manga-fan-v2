import React from 'react';
import axios from 'axios';

export default function submitLogin(values, dispatch) {
  axios
    .post('/api/users/login', values)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .then(resData => {
      dispatch({
        type: 'LOGIN',
        payload: resData
      });
    });
}
