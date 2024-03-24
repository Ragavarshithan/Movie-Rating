
package com.ragav.Movie.controller;
import com.ragav.Movie.model.Movie;
import com.ragav.Movie.repository.MovieRepository;
import com.ragav.Movie.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.util.List;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieRepository movieRepository;

    @PostMapping("/add")
   public Movie createMovie(@RequestBody Movie movie){
       return movieService.createMovie(movie);
   }
    @GetMapping("/view")
    public List<Movie>getAllMovies(){
        return movieService.getAllMovies();
    }

    // For searching
    @GetMapping("search/{keyword}")
    public Page<Movie> findBySearch(Pageable pageable, @PathVariable("keyword") String keyword) {
        return movieRepository.findBySearch(pageable,keyword);
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id){
        return movieService.getMovieById(id);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id,@RequestBody Movie movie){
        return movieService.updateMovie(id,movie);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id){
        movieService.deleteMovie(id);
    }
}
