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
            <div classname="user-image">
                <img src={user} alt="user" />
            </div> 
        </div>
    );
};

export default Header;