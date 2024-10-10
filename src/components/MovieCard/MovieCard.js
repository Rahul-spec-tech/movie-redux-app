import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMovieOrShowDetail, removeSelectedMovieOrShow } from '../../features/movies/movieSlice';
import "./MovieCard.scss";

const MovieCard = (props) => {
    const { data } = props;
    const dispatch = useDispatch();
    const [movieDetail, setMovieDetail] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const result = await dispatch(fetchMovieOrShowDetail(data.imdbID)).unwrap();
                if (result && result.Genre) {
                    setMovieDetail(result);
                }
            } catch (error) {
                console.error('Failed to fetch details:', error);
            }
        };
        fetchDetails();
        return () => {
            dispatch(removeSelectedMovieOrShow());
        };
    }, [dispatch, data.imdbID]);

    return (
        <div className="card-item">
            <Link to={`/movie/${data.imdbID}`}>
                <div className="card-inner">
                    <div className="card-top">
                        <img src={data.Poster !== "N/A" ? data.Poster : "/path/to/default-poster.jpg"} alt={data.Title} />
                    </div>
                    <div className="card-bottom">
                        <div className="card-info">
                            <h4>{data.Title}</h4>
                            <p>{data.Year}</p>
                            <p>{movieDetail && movieDetail.Genre ? movieDetail.Genre : "Fetching Genre..."}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;