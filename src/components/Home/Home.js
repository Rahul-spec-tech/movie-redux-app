import React, { useEffect } from 'react';
import MovieListing from "../MovieListing/MovieListing.js";
import { useDispatch } from 'react-redux';
import { fetchMovies, fetchShows } from '../../features/movies/movieSlice.js';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() =>{
        const movie="Avatar";
        const show="Friends";
        dispatch(fetchMovies(movie));
        dispatch(fetchShows(show));
    }, [dispatch]);

    return (
        <div>
            <div className="banner-img"></div>
            <MovieListing />
        </div>
    );
};

export default Home;
