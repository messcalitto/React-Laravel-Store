import React from 'react';

const PriceItem = ({title,  value, reff=null, addClass=''}) => {
    return (
        <div className={`d-flex justify-content-between fw-medium ${addClass}`}>
        <p >{title}</p>
        <p >$<span ref={reff}>{value}</span></p>
        </div>
    );
}

export default PriceItem;
