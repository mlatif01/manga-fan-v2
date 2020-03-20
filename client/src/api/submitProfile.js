import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const profileGoodRequest = () =>
  toast.success('Profile Updated Successfully', {
    position: toast.POSITION.RIGHT
  });
const profileBadRequest = error => toast.error(error);

export default async function submitProfile(values, dispatch) {
  const headerConfig = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: JSON.parse(localStorage.getItem('token'))
    }
  };

  try {
    const res = await axios.put('/api/users/profile', values, headerConfig);
    if (res.status === 200) {
      profileGoodRequest();
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: res.data
      });
    }
  } catch (error) {
    profileBadRequest('Profile could not be updated');
  }
}
