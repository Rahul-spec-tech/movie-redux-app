import React, { useEffect } from 'react'; 

const genres = ["Action", "Horror", "Thriller", "Slasher", "Comedy", "Drama", 
    "Fantasy", "Sci-Fi", "Adventure", "Animation", "Biography", 
    "Crime", "Documentary", "Family", "History", "Musical", 
    "Mystery", "Sport", "Western", "War", "Action-Adventure", 
    "Adventure-Comedy", "Fantasy-Adventure", "Psychological", 
    "Historical Fiction", "Political", "Superhero", 
    "Dystopian", "Post-Apocalyptic"];

const years = [2009, 2018]; 

const GenreFilter = ({ selectedGenres, handleGenreChange, selectedYears, handleYearChange }) => {
    const handleCheckbox = (genre) => {
        handleGenreChange(genre); 
        console.log('Selected Genre:', genre); 
    };

    const handleYearCheckbox = (year) => {
        handleYearChange(year);
        console.log('Selected Year:', year); 
    };
    useEffect(() => {
        console.log('Currently Selected Years:', selectedYears);
    }, [selectedYears]);

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
            <h2><center>Year</center></h2> 
            {years.map((year) => (
                <div key={year} className="year-checkbox">
                    <label>
                        <input type="checkbox" value={year} checked={selectedYears.includes(year)} onChange={() => handleYearCheckbox(year)}/>{year}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default GenreFilter;
