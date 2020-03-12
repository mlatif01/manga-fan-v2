// import { useState, useEffect } from 'react';

// export default function mangaHook(initialState, dispatch) {
//   const [values, setValues] = useState(initialState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     dispatch({
//       type: 'FETCH_MANGA_REQUEST'
//     });
//     fetch('/api/manga', {
//       headers: {
//         Authorization: `Bearer ${authState.token}`
//       }
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw res;
//         }
//       })
//       .then(resJson => {
//         console.log(resJson);
//         dispatch({
//           type: 'FETCH_MANGA_SUCCESS',
//           payload: resJson
//         });
//       })
//       .catch(error => {
//         console.log(error);
//         dispatch({
//           type: 'FETCH_MANGA_FAILURE'
//         });
//       });
//   }, [authState.token]);

//   // const handleChange = e => {
//   //   setValues({
//   //     ...values,
//   //     [e.target.name]: e.target.value
//   //   });
//   // };

//   // const handleBlur = e => {
//   //   const validationErrors = validate(values);
//   //   setErrors(validationErrors);
//   // };

//   // const handleSubmit = e => {
//   //   e.preventDefault();
//   //   const validationErrors = validate(values);
//   //   setErrors(validationErrors);
//   //   setSubmitting(true);
//   // };

//   return {
//     // handleSubmit,
//     // handleChange,
//     // handleBlur,
//     // errors,
//     // isSubmitting,
//     // values
//   };
// }
