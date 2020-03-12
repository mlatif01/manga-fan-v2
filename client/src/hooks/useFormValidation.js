import { useState, useEffect } from 'react';
import axios from 'axios';
import submitLogin from '../api/submitLogin';
import submitRegister from '../api/submitRegister';

export default function useFormValidation(initialState, validate, dispatch) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      const { username, email, password } = values;

      if (noErrors) {
        // If no errors submit form - check if login or register
        if (Object.keys(values).length > 2) {
          submitRegister({ username, email, password }, dispatch);
        } else {
          submitLogin(values, dispatch);
        }
        setSubmitting(false);
      } else {
        // Display errors on that object
        setSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleBlur = e => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  };

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    isSubmitting,
    values
  };
}
