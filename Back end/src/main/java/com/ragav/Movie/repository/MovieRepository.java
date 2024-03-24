package com.ragav.Movie.repository;

import com.ragav.Movie.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
@Repository
public interface MovieRepository extends JpaRepository<Movie,Long> {

    @Query("FROM Movie m WHERE m.movName LIKE %:keyword% OR m.castList LIKE %:keyword% OR m.director LIKE %:keyword% OR m.genre LIKE %:keyword%")
    Page<Movie> findBySearch(Pageable pageable, @Param("keyword") String keyword);
}
