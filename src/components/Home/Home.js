import React, { useEffect, useState } from 'react'; 
import MovieListing from "../MovieListing/MovieListing.js";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchShows, getAllMovies, getAllShows, getCurrentPage, getTotalPages, setPage } from '../../features/movies/movieSlice.js';
import GenreFilter from '../GenreFilter/GenreFilter.js';
import Header from '../Header/Header.js';
import './Home.scss';

const Home = () => {
    const dispatch = useDispatch();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [checkedYear, setCheckedYear] = useState([]);
    const [searchTerm, setSearchTerm] = useState("Star");
    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows); 
    const currentPage = useSelector(getCurrentPage);
    const totalPages = useSelector(getTotalPages);

    useEffect(() => {
        const fetchData = () => {
            const year = checkedYear.length > 0 ? Number(checkedYear[0]) : null; 
            console.log('Selected Year:', year);
            dispatch(fetchMovies({ movie: searchTerm, page: currentPage, year }));
            dispatch(fetchShows({ show: searchTerm, page: currentPage, year }));
        };
        fetchData();
    }, [dispatch, currentPage, searchTerm, selectedGenres, checkedYear]);

    

    const handleGenreChange = (genre) => {
        setSelectedGenres(prevGenres => prevGenres.includes(genre) ? 
            prevGenres.filter(gen => gen !== genre) : [...prevGenres, genre]
        );
    };
    const filteredMovies = movies.Response === "True" && Array.isArray(movies.Search)? movies.Search.filter(movie => {
        const movieGenres = typeof movie.Genre === 'string' ? movie.Genre.split(", ").map(gen => gen.toLowerCase()) : [];
        const isYearSelected = checkedYear.length === 0 || checkedYear.includes(String(movie.Year));  
        return (selectedGenres.length === 0 || selectedGenres.some(genre => movieGenres.includes(genre.toLowerCase()))) && isYearSelected;
      })
    : [];

    const handleYearChange = (year) => {
        setCheckedYear(prev => prev.includes(year) ? 
            prevYears.filter(yr => yr !== year) : [...prev, year]
        );
    };

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    return (
        <div className="home-container">
            <Header setSearchTerm={setSearchTerm} />
            <div className="genre-card">
                <GenreFilter selectedGenres={selectedGenres} handleGenreChange={handleGenreChange} selectedYears={checkedYear} handleYearChange={handleYearChange} />
            </div>
            <div className="main-content">
            {filteredMovies.length > 0 || shows.Response === "True" ? (
                <MovieListing movies={filteredMovies} shows={shows} /> 
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
