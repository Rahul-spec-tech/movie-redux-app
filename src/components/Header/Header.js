import React from 'react';
import { Link } from 'react-router-dom';
import user from "../../images/OIP (1).jpeg";
import "./Header.scss";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">
            <div className="logo">Movie App</div>
            </Link>
            <div className="user-image">
                <img src="https://th.bing.com/th/id/OIP.lcdOc6CAIpbvYx3XHfoJ0gHaF3?w=223&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7" alt="user" />
            </div> 
        </div>
    );
};

export default Header;