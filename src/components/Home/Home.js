import React, { useEffect } from 'react';
import MovieListing from "../MovieListing/MovieListing.js";
import movieApi from '../../common/apis/movieApi.js';
import { APIKey } from '../../common/apis/movieApiKey.js';
import { useDispatch } from 'react-redux';
import { addMovies } from '../../features/movies/movieSlice.js';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const movieText = "Harry";
        const fetchMovies = async () => {
            const response = await movieApi.get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)
                .catch((err) => {
                    console.log("Err: ", err);
                });
            //console.log("The Response from API ", response);
            dispatch(addMovies(response.data));
        };
        fetchMovies();
    }, [dispatch]);

    return (
        <div>
            <div className="banner-img"></div>
            <MovieListing />
        </div>
    );
};

export default Home;
