import React, { useState, useEffect } from 'react';
import { AuthContext } from '../App';

import submitProfile from '../api/submitProfile';

const INITIAL_STATE = {
  bio: '',
  instagram: '',
};

export default function ProfileCard({ user }) {
  const { dispatch } = React.useContext(AuthContext);

  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState(INITIAL_STATE);

  useEffect(() => {
    setValues({
      bio: user.profile.bio,
      instagram: user.profile.instagram,
    });
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitProfile(values, dispatch);
    setSubmitting(true);
    setSubmitting(false);
  };

  return (
    <div className='profile card'>
      <h2 className='text-md'>Profile</h2>
      <div className='line'></div>
      <p className='lead'>Add some info to your profile</p>
      <form onSubmit={handleSubmit} className='profile-form'>
        <div className='profile-form-group'>
          <i className='fas fa-address-card fa-4x'></i>
          <p className='lead'>Bio</p>
          <textarea
            defaultValue={values.bio}
            onChange={handleChange}
            type='textarea'
            rows='4'
            cols='30'
            placeholder='About Me'
            name='bio'
          />
          <small>Write a short bio.</small>
        </div>
        <div className='profile-form-group'>
          <i className='fab fa-instagram fa-4x'></i>
          <p className='lead'>Instagram</p>
          <input
            defaultValue={values.instagram}
            type='text'
            placeholder='Instagram URL'
            name='instagram'
            onChange={handleChange}
          />
          <small>Add your instagram profile.</small>
        </div>
        <button
          disabled={isSubmitting}
          type='submit'
          value='Register'
          className='btn btn-primary btn-md'
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
