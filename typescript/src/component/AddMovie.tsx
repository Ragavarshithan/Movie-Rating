// import React, { useState } from 'react';
// import axios from 'axios';
// import {Link,useNavigate} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.css';



// const AddMovie = () => {
//   const navigate = useNavigate();
//     const [movName, setMovieName] = useState('');
//     const [castList, setCastList] = useState('');
//     const [director,setDirector] = useState('');
//     const [language,setLanguage]  = useState("");
//     const [image, setImage] = useState<File | null>(null);
//     const [storyLine, setStoryLine] = useState('');
//     const [genre, setGenre] = useState('');
//     const [releaseDate, setReleaseDate] = useState('');
//     const [rating, setRating] = useState('');

//     const saveMovie = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
  
//       if (!image) {
//         console.error('Image is required');
//         return;
//       }
//       // Convert the image to base64
//       const reader = new FileReader();
//       reader.readAsDataURL(image);
//       reader.onloadend = () => {
//         const base64Image = reader.result;
        
//         // Send the base64 image string along with other form data
//         axios
//           .post('http://localhost:8080/movies/add', {
//             movName,
//             castList,
//             director,
//             language,
//             imageUrl: base64Image,
//             storyLine,
//             genre,
//             releaseDate,
//             rating,
//           })
//           .then((response) => {
//             console.log(response);
//             navigate(`/movies/view/${response.data.id}`);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       };
//     };
  
//   return (
//     <div>
//     <br />
//     <br />
//     <div className='container'>
//       <div className='row'>
//         <div className='card col-md-6 offset-md-3 offset-md-3'>
//           <h2 className='text-center'>Add Movie</h2>
//           <div className='card-body'>
//             <form onSubmit={saveMovie}>
//               <div className='form-group mb-2'>
//                 <label className='form-label'>Movie Name :</label>
//                 <input
//                   type='text'
//                   placeholder='MovieName'
//                   name='MovieName'
//                   className='form-control'
//                   value={movName}
//                   onChange={(e) => setMovieName(e.target.value)}
//                   required
//                 />
//                 <label className='form-label'>Cast :</label>
//                 <input
//                   type='text'
//                   placeholder='Cast list'
//                   name='cast'
//                   className='form-control'
//                   value={castList}
//                   onChange={(e) => setCastList(e.target.value)}
//                   required
//                 />
//                 <label className='form-label'>Directed By :</label>
//                 <input
//                   type='text'
//                   placeholder='Directed by'
//                   name='director'
//                   className='form-control'
//                   value={director}
//                   onChange={(e) => setDirector(e.target.value)}
//                   required
//                 />
//                  <label className='form-label'>Image :</label>
//                 <input
//                   type='file'
//                   name='image'
//                   className='form-control'
//                   onChange={(e) => setImage(e.target.files[0])}
//                   required
//                 /> 
//                 <label className='form-label'>Language :</label>
//                 <input
//                   type='text'
//                   placeholder='Language'
//                   name='language'
//                   className='form-control'
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   required
//                 />
//                 <label className='form-label'>Story Line :</label>
//                 <input
//                   type='text'
//                   placeholder='Story line'
//                   name='storyline'
//                   className='form-control'
//                   value={storyLine}
//                   onChange={(e) => setStoryLine(e.target.value)}
//                   required
//                 />
//                 <label className='form-label'>Genre :</label>
//                 <input
//                   type='text'
//                   name='Genre'
//                   className='form-control'
//                   value={genre}
//                   onChange={(e) => setGenre(e.target.value)}
//                   required
//                 />
//                 <label className='form-label'>Release Date :</label>
//                 <input
//                   type='date'
//                   name='releasedate'
//                   className='form-control'
//                   value={releaseDate}
//                   onChange={(e) => setReleaseDate(e.target.value)}
//                   required
//                 />
//                 <label className='form-label'>Rating :</label>
//                 <input
//                   type='text'
//                   name='rating'
//                   className='form-control'
//                   value={rating}
//                   onChange={(e) => setRating(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="col-md-6 d-flex justify-content-md-end align-items-end">
//                 {/* "Save" button */}
//                 <button type="submit" className='btn btn-success'>Save</button>
//                 {/* "Cancel" button */}
//                 <Link to="/movies/view/" className='btn btn-danger ms-2'>Cancel</Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// };
// export default AddMovie

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

interface FormValues {
  movName: string;
  castList: string;
  director: string;
  language: string;
  image: File | null;
  storyLine: string;
  genre: string;
  releaseDate: string;
  rating: number;
}

const AddMovie = () => {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    movName: '',
    castList: '',
    director: '',
    language: '',
    image: null,
    storyLine: '',
    genre: '',
    releaseDate: '',
    rating: 0
  };

  const validationSchema = Yup.object().shape({
    movName: Yup.string().required('Movie name is required'),
    castList: Yup.string().required('Cast list is required'),
    director: Yup.string().required('Director is required'),
    language: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Language can only contain letters')
    .required('Language is required'),
    image: Yup.mixed().required('Image is required'),
    storyLine: Yup.string().required('Story line is required'),
    genre: Yup.string().required('Genre is required'),
    releaseDate: Yup.string().required('Release date is required'),
    rating: Yup.number()
    .typeError('Rating must be a number')
    .required('Rating is required'),
  });

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      // Convert the image to base64
      const reader = new FileReader();
      reader.readAsDataURL(values.image!);
      reader.onloadend = () => {
        const base64Image = reader.result as string;

        // Send the base64 image string along with other form data
        axios
          .post('http://localhost:8080/movies/add', {
            movName: values.movName,
            castList: values.castList,
            director: values.director,
            language: values.language,
            imageUrl: base64Image,
            storyLine: values.storyLine,
            genre: values.genre,
            releaseDate: values.releaseDate,
            rating: values.rating,
          })
          .then((response) => {
            console.log(response);
            navigate(`/movies/view/${response.data.id}`);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center'>Add Movie</h2>
            <div className='card-body'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className='form-group mb-2'>
                      <label className='form-label'>Movie Name :</label>
                      <Field
                        type='text'
                        placeholder='MovieName'
                        name='movName'
                        className='form-control'
                      />
                      <ErrorMessage name='movName' component='div' className='text-danger' />

                      <label className='form-label'>Cast :</label>
                      <Field
                        type='text'
                        placeholder='Cast list'
                        name='castList'
                        className='form-control'
                      />
                      <ErrorMessage name='castList' component='div' className='text-danger' />

                      <label className='form-label'>Directed By :</label>
                      <Field
                        type='text'
                        placeholder='Directed by'
                        name='director'
                        className='form-control'
                      />
                      <ErrorMessage name='director' component='div' className='text-danger' />

                      <label className='form-label'>Image :</label>
                      <Field type='file' name='image' className='form-control' />
                      <ErrorMessage name='image' component='div' className='text-danger' />

                      <label className='form-label'>Language :</label>
                      <Field
                        type='text'
                        placeholder='Language'
                        name='language'
                        className='form-control'
                      />
                      <ErrorMessage name='language' component='div' className='text-danger' />

                      <label className='form-label'>Story Line :</label>
                      <Field
                        type='text'
                        placeholder='Storyline'
                        name='storyline'
                        className='form-control'
                      />
                      <ErrorMessage name='storyline' component='div' className='text-danger' />

                      <label className='form-label'>Genre :</label>
                      <Field
                        type='text'
                        placeholder='Genre'
                        name='genre'
                        className='form-control'
                      />
                      <ErrorMessage name='genre' component='div' className='text-danger' />

                      <label className='form-label'>Release Date :</label>
                      <Field
                        type='date'
  
                        name='releasedate'
                        className='form-control'
                      />
                      <ErrorMessage name='releasedate' component='div' className='text-danger' />

                      <label className='form-label'>Rating :</label>
                      <Field
                        type='text'
                        placeholder='rating'
                        name='rating'
                        className='form-control'
                      />
                      <ErrorMessage name='rating' component='div' className='text-danger' />

                      <div className='col-md-6 d-flex justify-content-md-end align-items-end'>
                        {/* "Save" button */}
                        <button
                          type='submit'
                          className='btn btn-success'
                          disabled={isSubmitting}
                        >
                          Save
                        </button>
                        {/* "Cancel" button */}
                        <Link to='/movies/view/' className='btn btn-danger ms-2'>
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
