import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = ({title, to}) => {
    return (
        <li className="nav-item">
            <NavLink className="nav-link" activeclassname="active" to={to}>{title}</NavLink>
        </li>
    );
}

export default MenuItem;
