import React from 'react';

const genres = ["Action", "Horror", "Thriller", "Slasher", "Comedy", "Drama", 
    "Fantasy", "Sci-Fi", "Adventure", "Animation", "Biography", 
    "Crime", "Documentary", "Family", "History", "Musical", 
    "Mystery", "Sport", "Western", "War", "Action-Adventure", 
    "Adventure-Comedy", "Fantasy-Adventure", "Psychological", 
    "Historical Fiction", "Political", "Superhero", 
    "Dystopian", "Post-Apocalyptic"];
const GenreFilter = ({ selectedGenres, handleGenreChange }) => {
    const handleCheckbox = (genre) => {
        console.log(`Selected genre: ${genre}`);
        handleGenreChange(genre); 
    };
    return (
        <div className="genre-filter">
            <h2><center>Genre</center></h2>
            {genres.map((genre) => (
                <div key={genre} className="genre-checkbox">
                    <label>
                        <input type="checkbox" value={genre} checked={selectedGenres.includes(genre)} onChange={() => handleCheckbox(genre)}/>{genre}
                    </label>
                </div>
            ))}
        </div>
    );
};
export default GenreFilter;
