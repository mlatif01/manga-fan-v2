import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const registerGoodRequest = () =>
  toast.success('Registered Successfully', {
    position: toast.POSITION.RIGHT
  });
const registerBadRequest = error => toast.error(error);

export default function submitRegister(values, dispatch) {
  axios
    .post('/api/users/register', values)
    .then((res, err) => {
      if (res.status === 200) {
        registerGoodRequest();
        return res.data;
      }
    })
    .then(resData => {
      dispatch({
        type: 'REGISTER',
        payload: resData
      });
    })
    .catch(error => {
      registerBadRequest(error.response.data);
    });
}
