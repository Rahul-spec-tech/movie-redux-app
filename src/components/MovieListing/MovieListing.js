import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import "./MovieListing.scss";

const MovieListing = ({ movies, shows }) => { 
    let renderMovies = movies.length > 0 ? (
        movies.map((movie, index) => (
            <MovieCard key={index} data={movie} />
        ))
    ) : (
        <div className="movies-error">
            <h3>No Movies Found</h3>
        </div>
    );

    let renderShows = shows.length > 0 ? (
        shows.map((show, index) => (
            <MovieCard key={index} data={show} />
        ))
    ) : (
        <div className="show-error">
            <h3>No Shows Found</h3>
        </div>
    );

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