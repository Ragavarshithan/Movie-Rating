import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

interface Movie {
  id: string;
  movName: string;
  castList: string;
  director: string;
  language: string;
  image: string;
  storyLine: string;
  genre: string;
  releaseDate: string;
  rating: string;
}

const UpdateMovie: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  const validationSchema = Yup.object().shape({
    movName: Yup.string().required('Movie name is required'),
    castList: Yup.string().required('Cast list is required'),
    director: Yup.string().required('Director is required'),
    language: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Language can only contain letters')
    .required('Language is required'),
    storyLine: Yup.string().required('Story line is required'),
    genre: Yup.string().required('Genre is required'),
    releaseDate: Yup.string().required('Release date is required'),
    rating: Yup.number()
    .typeError('Rating must be a number')
    .required('Rating is required'),
  });

  const handleSubmit = async (values: Movie) => {
    try {
      const response = await axios.put(`http://localhost:8080/movies/${id}`, values);
      console.log(response);
      navigate(`/movies/view/${id}`);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <br />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center'>Update Movie</h2>
            <div className='card-body'>
              <Formik
                initialValues={movie}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                <Form>
                  <div className='form-group mb-2'>
                    <label className='form-label'>Movie Name :</label>
                    <Field type='text' name='movName' className='form-control' />
                    <ErrorMessage name='movName' component='div' className='text-danger' />

                    <label className='form-label'>Cast :</label>
                      <Field
                        type='text'
                        name='castList'
                        className='form-control'
                      />
                      <ErrorMessage name='castList' component='div' className='text-danger' />

                      <label className='form-label'>Directed By :</label>
                      <Field
                        type='text'
                        name='director'
                        className='form-control'
                      />
                      <ErrorMessage name='director' component='div' className='text-danger' />

                      <label className='form-label'>Language :</label>
                      <Field
                        type='text'
                        name='language'
                        className='form-control'
                      />
                      <ErrorMessage name='language' component='div' className='text-danger' />

                      <label className='form-label'>Story Line :</label>
                      <Field
                        type='text'
                        name='storyLine'
                        className='form-control'
                      />
                      <ErrorMessage name='storyline' component='div' className='text-danger' />

                      <label className='form-label'>Genre :</label>
                      <Field
                        type='text'
                        name='genre'
                        className='form-control'
                      />
                      <ErrorMessage name='genre' component='div' className='text-danger' />

                      <label className='form-label'>Release Date :</label>
                      <Field
                        type='date'
                        name='releaseDate'
                        className='form-control'
                      />
                      <ErrorMessage name='releaseDate' component='div' className='text-danger' />

                      <label className='form-label'>Rating :</label>
                      <Field
                        type='text'
                        name='rating'
                        className='form-control'
                      />
                      <ErrorMessage name='rating' component='div' className='text-danger' />

                    <div className="col-md-6 d-flex justify-content-md-end align-items-end">
                      <button type="submit" className='btn btn-success'>Update</button>
                      <Link to={`/movies/view/${id}`} className='btn btn-danger ms-2'>Cancel</Link>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
