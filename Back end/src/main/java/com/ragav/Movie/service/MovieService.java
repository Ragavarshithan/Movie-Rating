package com.ragav.Movie.service;

import com.ragav.Movie.model.Movie;


import java.util.List;

public interface MovieService {

    List<Movie>getAllMovies();
    Movie getMovieById(Long movId);
    Movie createMovie(Movie movie);
    Movie updateMovie(Long movId,Movie movie);
    void deleteMovie(Long MovId);
}
