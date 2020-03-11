import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFormValidation(initialState, validate, dispatch) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      console.log(errors);
      if (noErrors) {
        console.log('SUBMITTING LOGIN');
        // If no errors submit form
        axios
          .post('/api/users/login', values)
          .then(res => {
            if (res.status === 200) {
              return res.data;
            }
          })
          .then(resData => {
            dispatch({
              type: 'LOGIN',
              payload: resData
            });
          });
        setSubmitting(false);
      } else {
        // Display errors on that object
        console.log('INVALID LOGIN SUBMISSION');
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
