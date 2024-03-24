package com.ragav.Movie.service.impl;

import com.ragav.Movie.model.Movie;
import com.ragav.Movie.repository.MovieRepository;
import com.ragav.Movie.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }


    @Override
    public Movie getMovieById(Long movId) {
        return movieRepository.findById(movId).orElse(null);
    }

    @Override
    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public Movie updateMovie(Long movId, Movie movie) {
        if (movieRepository.existsById(movId)){
            movie.setMovId(movId);
                return movieRepository.save(movie);
        }
        return null;
    }

    @Override
    public void deleteMovie(Long movId) {
       movieRepository.deleteById(movId);
    }


}
