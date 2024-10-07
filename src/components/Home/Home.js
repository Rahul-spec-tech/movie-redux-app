import React, { useEffect, useState } from 'react'; 
import MovieListing from "../MovieListing/MovieListing.js";
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchMovies, fetchShows, getAllMovies, getCurrentPage, getTotalPages, setPage } from '../../features/movies/movieSlice.js';
import GenreFilter from '../GenreFilter/GenreFilter.js';
import Header from '../Header/Header.js';
import './Home.scss';

const Home = () => {
    const dispatch = useDispatch();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState("Avatar");
    const movies = useSelector(getAllMovies);
    const currentPage = useSelector(getCurrentPage);
    const totalPages = useSelector(getTotalPages);

    useEffect(() => {
        dispatch(fetchMovies({ movie: searchTerm, page: currentPage }));
        dispatch(fetchShows({ show: searchTerm, page: currentPage }));
    }, [dispatch, currentPage, searchTerm]);

    const handleGenreChange = (genre) => {
        setSelectedGenres(prevGenres => 
            prevGenres.includes(genre) ? 
            prevGenres.filter(gen => gen !== genre) : [...prevGenres, genre]
        );
    };

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    const filteredMovies = movies.Response === "True" && Array.isArray(movies.Search)
        ? movies.Search.filter(movie => {
            const movieGenres = typeof movie.Genre === 'string' ? movie.Genre.split(", ") : [];
            return !selectedGenres.length || selectedGenres.some(genre => movieGenres.includes(genre));
        })
        : [];

    return (
        <div className="home-container">
            <Header setSearchTerm={setSearchTerm} />
            <div className="genre-card">
                <GenreFilter selectedGenres={selectedGenres} handleGenreChange={handleGenreChange} />
            </div>
            <div className="main-content">
                {filteredMovies.length > 0 ? (
                    <MovieListing movies={filteredMovies} />
                ) : (
                    <div className="movies-error">
                        <h3>No Movies Found</h3>
                    </div>
                )}
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    <span>{currentPage} / {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
