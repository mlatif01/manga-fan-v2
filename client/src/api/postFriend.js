import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const friendGoodRequest = () =>
  toast.success('Friend Added Successfully', {
    position: toast.POSITION.RIGHT
  });
const friendBadRequest = () => toast.error('Friend Could Not Be Added');

export default async function postFriend(name, friendId, authState) {
  const friendData = {
    friendId: friendId,
    name: name
  };

  const headerConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: JSON.parse(localStorage.getItem('token'))
    }
  };

  try {
    const res = await axios.post('/api/users/friends', friendData, headerConfig);
    if (res.status === 200) {
      friendGoodRequest();
      // dispatch({
      //   type: 'LOGIN',
      //   payload: res.data
      // });
    }
  } catch (err) {
    console.log(err);
    friendBadRequest();
  }
}
