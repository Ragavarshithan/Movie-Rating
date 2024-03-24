import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import MovieCard from '../component/MovieCard';
import { Link } from 'react-router-dom';



interface Movie {
  movId: number;
  movName: string;
  castList: string;
  director: string;
  imageUrl: string;
  storyLine: string;
  genre: string;
  releaseDate: string;
  rating: number;
  language: string;
  
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
   const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Movie[]>('http://localhost:8080/movies/view');
      const sortedData = [...response.data].sort((a, b) => a.movId - b.movId);
      setMovies(sortedData);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/movies/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div className='container'>
        <h2 className='text-center'>Movie List</h2>
        
       
        <div className='row'>
          {movies.map(({ movId, movName, castList, director, imageUrl, storyLine, genre, releaseDate, rating, language}) => (
            <div key={movId} className='col-md-4 mb-3'>
              <MovieCard
                Movie={movName}
                Language={language}
                Releasedate={new Date(releaseDate).toLocaleDateString()}
                Img={imageUrl}
                CastList={castList}
                Storyline={storyLine}
                Director={director}
                Genre={genre}
                Rating={rating}
                Delete={<button onClick={() => handleDelete(movId)} className='btn btn-danger'>Delete</button>}
                Update={<Link to={`/update/${movId}`} className='btn btn-info' style={{ marginRight: '5px' }}>Update</Link>}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
