import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovies, fetchShows } from '../../features/movies/movieSlice';
import "./Header.scss";

const Header = ({ setSearchTerm }) => {
    const [term, setTerm] = useState("");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(term){
            setSearchTerm(term); 
            dispatch(fetchMovies({ movie: term, page: 1 })); 
            dispatch(fetchShows({ show: term, page: 1 })); 
            setTerm(""); 
        }
    };
    return (
        <div className="header">
            <div className="logo"><Link to="/">Movie App</Link></div>
            <div className="search-bar">
                <form onSubmit={submitHandler}>
                    <input type="text" value={term} placeholder="Search Movies or Shows" onChange={(e) => setTerm(e.target.value)}/>
                    <button><i className="fa fa-search"></i></button>
                </form>
            </div>
            <div className="user-image">
                <img src="https://th.bing.com/th/id/OIP.lcdOc6CAIpbvYx3XHfoJ0gHaF3?w=223&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="user" />
            </div> 
        </div>
    );
};

export default Header;