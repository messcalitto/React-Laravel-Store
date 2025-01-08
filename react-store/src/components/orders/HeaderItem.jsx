import React from 'react';

const HeaderItem = ({title, className=''}) => {
    return (
        <th scope="col" className={className}>{title}</th>
    );
}

export default HeaderItem;
