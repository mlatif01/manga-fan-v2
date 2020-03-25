import React from 'react';
import axios from 'axios';

// Fetch Users Manga List
export default async function getUsersManga() {
  const headerConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token'))
    }
  };

  try {
    // Fetch users manga list
    const response = await axios.get('/api/manga', headerConfig);
    const data = await response;

    console.log('received users manga data');
    return data;
  } catch (err) {
    console.log(err);
  }
}
