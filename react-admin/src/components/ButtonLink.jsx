import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


const ButtonLink = ({to, icon, title}) => {
    return (
        <Button variant="contained" color="primary">
            <Link to={to}>{icon}{title}</Link>
        </Button>
    );
}

export default ButtonLink;

