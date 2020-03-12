import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const loginGoodRequest = () =>
  toast.success('Logged in Successfully', {
    position: toast.POSITION.RIGHT
  });
const loginBadRequest = () => toast.error('Invalid Credentials');

export default async function submitLogin(values, dispatch) {
  try {
    const res = await axios.post('/api/users/login', values);
    if (res.status === 200) {
      loginGoodRequest();
      dispatch({
        type: 'LOGIN',
        payload: res.data
      });
    }
  } catch (err) {
    loginBadRequest();
  }

  // axios
  //   .post('/api/users/login', values)
  //   .then(res => {
  //     if (res.status === 200) {
  //       return res.data;
  //     }
  //   })
  //   .then(resData => {
  //     dispatch({
  //       type: 'LOGIN',
  //       payload: resData
  //     });
  //   });
}
