import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    title: string;
    to: string;
    addClass?: string;
}

const Button: React.FC<ButtonProps> = ({title, to, addClass = ''}) => {
    return (
        <li className="nav-item">
        <Link className={`btn btn-primary ${addClass}`} to={to}>{title}</Link>
        </li>
    );
}

export default Button;
