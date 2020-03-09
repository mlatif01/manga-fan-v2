import React from 'react';
import useFormValidation from '../hooks/useFormValidation';
import validateAuth from '../helpers/validateAuth';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export default function Register({ icon }) {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    isSubmitting,
    values
  } = useFormValidation(INITIAL_STATE, validateAuth);

  return (
    <div className='page-content'>
      <h1 className='text-lg'>Sign Up</h1>
      <p className='lead'>Create Your Account</p>
      <form className='form' onSubmit={handleSubmit}>
        <i className={icon} />
        <div className='form-group'>
          <input
            type='text'
            placeholder='Username'
            onChange={handleChange}
            onBlur={handleBlur}
            name='username'
            value={values.user}
            className={errors.username && 'error-input'}
          />
          {errors.username && (
            <small className='error-text fade-in'>{errors.username}</small>
          )}
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            onChange={handleChange}
            onBlur={handleBlur}
            name='email'
            value={values.email}
            className={errors.email && 'error-input'}
          />
          {errors.email && (
            <small className='error-text fade-in'>{errors.email}</small>
          )}
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            onChange={handleChange}
            onBlur={handleBlur}
            name='password'
            value={values.password}
            className={errors.password && 'error-input'}
          />
          {errors.password && (
            <small className='error-text fade-in'>{errors.password}</small>
          )}
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            onChange={handleChange}
            onBlur={handleBlur}
            name='confirmPassword'
            value={values.confirmPassword}
            className={errors.confirmPassword && 'error-input'}
          />
          {errors.confirmPassword && (
            <small className='error-text fade-in'>
              {errors.confirmPassword}
            </small>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type='submit'
          value='Register'
          className='btn btn-primary'
        >
          Register
        </button>
      </form>
    </div>
  );
}
