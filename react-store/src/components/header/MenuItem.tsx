import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = ({title, to}) => {
    return (
        <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}  to={to}>{title}</NavLink>
        </li>
    );
}

export default MenuItem;
