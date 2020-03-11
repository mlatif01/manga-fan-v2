import React from 'react';
import useFormValidation from '../hooks/useFormValidation';
import validateAuth from '../helpers/validateAuth';
import { AuthContext } from '../App';

const INITIAL_STATE = {
  email: '',
  password: ''
};

export default function Login({ icon }) {
  const { dispatch } = React.useContext(AuthContext);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    isSubmitting,
    values
  } = useFormValidation(INITIAL_STATE, validateAuth, dispatch);

  return (
    <div className='page-content'>
      <h2 className='text-lg'>Sign In</h2>
      <p className='lead'>Login To Your Account</p>
      <form className='form login' onSubmit={handleSubmit}>
        <i className={icon} />
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
        <button
          disabled={isSubmitting}
          type='submit'
          value='Register'
          className='btn btn-primary'
        >
          Login
        </button>
      </form>
    </div>
  );
}
