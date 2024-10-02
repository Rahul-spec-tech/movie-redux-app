import React, { useEffect } from 'react';
import MovieListing from "../MovieListing/MovieListing.js";
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../features/movies/movieSlice.js';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() =>{
        const movie="Avatar";
        dispatch(fetchMovies(movie));
    }, [dispatch]);

    return (
        <div>
            <div className="banner-img"></div>
            <MovieListing />
        </div>
    );
};

export default Home;
