import React from 'react';
import axios from 'axios';

// Fetch Users Friends List
export default async function getOtakuProfile(friendId) {
  const headerConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token'))
    }
  };

  try {
    // Fetch users manga list
    const response = await axios.get(
      `/api/users/otaku` + `/${friendId}`,
      headerConfig
    );
    const data = await response;

    console.log('received otaku profile data');
    return data;
  } catch (err) {
    console.log(err);
  }
}
