export default function validateAuth(values) {
  const errors = {};
  // Username Errors
  if (!values.username) {
    errors.username = 'Username Required';
  } else if (values.username.length < 6) {
    errors.username = 'Username must be at least 6 characters';
  }
  // Email Errors
  if (!values.email) {
    errors.email = 'Email Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  // Password Errors
  if (!values.password) {
    errors.password = 'Password Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  // Password Match Errors
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password does not match';
  }
  return errors;
}
