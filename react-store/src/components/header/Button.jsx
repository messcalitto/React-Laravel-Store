import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({title, to, addClass}) => {
    return (
        <li className="nav-item">
        <Link className={`btn btn-primary ${addClass}`} to={to}>{title}</Link>
        </li>
    );
}

export default Button;
