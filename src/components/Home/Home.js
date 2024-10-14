import React, { useEffect, useState } from 'react'; 
import MovieListing from "../MovieListing/MovieListing.js";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchShows, fetchMovieOrShowDetail, getAllMovies, getAllShows, getCurrentPage, getTotalPages, setPage } from '../../features/movies/movieSlice.js';
import GenreFilter from '../GenreFilter/GenreFilter.js';
import Header from '../Header/Header.js';
import './Home.scss';

const Home = () => {
    const dispatch = useDispatch();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [checkedYear, setCheckedYear] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("Star");
    const [movieDetails, setMovieDetails] = useState([]);
    const [showDetails, setShowDetails] = useState([]);
    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows); 
    const currentPage = useSelector(getCurrentPage);
    const totalPages = useSelector(getTotalPages);

    useEffect(() => {
        const fetchData = async () => {
            const year = checkedYear.length > 0 ? Number(checkedYear[0]) : null;
            try {
                const movieResponse = await dispatch(fetchMovies({ movie: searchTerm, page: currentPage, year })).unwrap();
                const showResponse = await dispatch(fetchShows({ show: searchTerm, page: currentPage, year })).unwrap();
                
                const allMovies = movieResponse?.Search ? movieResponse.Search.filter(item => item.Type === "movie") : [];
                const allShows = showResponse?.Search ? showResponse.Search.filter(item => item.Type === "series") : [];
                
                setMovieDetails(allMovies); 
                setShowDetails(allShows);     
                console.log("Filtered Movies:", allMovies);
                console.log("Filtered Shows:", allShows);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [dispatch, currentPage, searchTerm, checkedYear]);

    useEffect(() => {
        const fetchMovieDetails = async (movieList, setDetailState) => {
            const detailedList = await Promise.all(
                movieList.map(async (item) => {
                    const details = await dispatch(fetchMovieOrShowDetail(item.imdbID)).unwrap();
                    return details;
                })
            );
            setDetailState(detailedList);
        };
        if (movies.Response === "True" && movies.Search.length > 0) {
            fetchMovieDetails(movies.Search, setMovieDetails);
        }
        if (shows.Response === "True" && shows.Search.length > 0) {
            fetchMovieDetails(shows.Search, setShowDetails);
        }
    }, [movies, shows, dispatch]);

    const resetDetails = () => {
        setSearchTerm("Star");
        setCheckedYear([]); 
        setSelectedGenres([]); 
    };

    const handleGenreChange = (genre) => {
        setSelectedGenres(prevGenres => prevGenres.includes(genre) ? prevGenres.filter(gen => gen !== genre) : [...prevGenres, genre]);
    };

    const handleYearChange = (year) => {
        setCheckedYear(prev => 
            prev.includes(year) ? prev.filter(yr => yr !== year) : [...prev, Number(year)]
        );
    };

    const filteredMovies = movieDetails.filter((movie) => {
        const movieGenres = movie.Genre ? movie.Genre.split(", ").map(gen => gen.toLowerCase()) : [];
        const genreMatch = selectedGenres.length === 0 || selectedGenres.some(genre => movieGenres.includes(genre.toLowerCase()));
        const selectedYear = checkedYear.length === 0 || checkedYear.includes(Number(movie.Year)); 
        return genreMatch && selectedYear;
    });

    const filteredShows = showDetails.filter((show) => {
        const showGenres = show.Genre ? show.Genre.split(", ").map(gen => gen.toLowerCase()) : [];
        const genreMatch = selectedGenres.length === 0 || selectedGenres.some(genre => showGenres.includes(genre.toLowerCase()));
        const selectedYear = checkedYear.length === 0 || checkedYear.includes(Number(show.Year)); 
        return genreMatch && selectedYear;
    });

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    };

    return (
        <div className="home-container">
            <Header setSearchTerm={setSearchTerm} />
            <div className="genre-card">
                <button type="button" onClick={resetDetails}>Reset</button>
                <GenreFilter selectedGenres={selectedGenres} handleGenreChange={handleGenreChange} selectedYears={checkedYear} handleYearChange={handleYearChange}/>
            </div>
            <div className="main-content">
                {filteredMovies.length > 0 || filteredShows.length > 0 ? (
                    <MovieListing movies={filteredMovies} shows={filteredShows} />
                ) : (
                    <div className="movies-error">
                        <h3>No Movies or Shows Found</h3>
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
