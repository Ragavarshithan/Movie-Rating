package com.ragav.Movie.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "movie")
@Data
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long movId;
    private String movName;
    private String castList;
    private String director;
    private String language;
//    @Lob
//    private byte[] image;
    private String imageUrl;
    private String storyLine;
    private String genre;
    private Date releaseDate;
    private Double rating;
}
