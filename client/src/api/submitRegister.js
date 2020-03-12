import React from 'react';
import axios from 'axios';

export default function submitRegister(values, dispatch) {
  axios
    .post('/api/users/register', values)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .then(resData => {
      dispatch({
        type: 'REGISTER',
        payload: resData
      });
    });
}
