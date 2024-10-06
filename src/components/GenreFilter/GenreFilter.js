import React from 'react';

const genres = ["Action", "Horror", "Thriller", "Slasher", "Romance", "Comedy", "Drama", "Fantasy", "Sci-Fi", "Adventure"];
const GenreFilter = ({ selectedGenres, handleGenreChange }) => {
    const handleCheckbox = (genre) => {
        console.log(`Checkbox: ${genre}`);
        handleGenreChange(genre);
    };
    return (
        <div className="genre-filter">
            <h2>Genre</h2>
            {genres.map((genre) => (
                <div key={genre} className="genre-checkbox">
                    <label>
                    <input type="checkbox" value={genre} checked={selectedGenres.includes(genre)} onChange={() => handleCheckbox(genre)}/>{genre}</label>
                </div>
            ))}
        </div>
    );
};
export default GenreFilter;
