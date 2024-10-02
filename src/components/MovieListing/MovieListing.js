import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import "./MovieListing.scss";

const MovieListing = () => {
    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);
    let renderMovies;
    if (movies.Response === "True") {
        renderMovies = movies.Search.map((movie, index) => (
            <MovieCard key={index} data={movie} />
        ));
    } else {
        renderMovies = (
            <div className="movies-error">
                <h3>No Movies Found</h3>
            </div>
        );
    }

    let renderShows;
    if (shows.Response === "True") {
        renderShows = shows.Search.map((show, index) => (
            <MovieCard key={index} data={show} />
        ));
    } else {
        renderShows = (
            <div className="show-error">
                <h3>No Shows Found</h3>
            </div>
        );
    }
    //console.log(movies);
    return (
        <div className="movie-wrapper">
            <div className="movie-list">
                <h2>Movies</h2>
                <div className="movie-container">{renderMovies}</div>
            </div>
            <div className="show-list">
                <h2>Shows</h2>
                <div className="show-container">{renderShows}</div>
            </div>
        </div>
    );
};

export default MovieListing;