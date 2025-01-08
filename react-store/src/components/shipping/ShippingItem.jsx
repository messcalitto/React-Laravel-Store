import React from 'react';

const ShippingItem = ({title, name, defaultValue}) => {
    return (
        <div className="col-md-12">
            <div className="form-group">
                <label htmlFor="name">{title}</label>
                <input type="text" className="form-control" name={name} placeholder={`Enter ${title}`} defaultValue={defaultValue} /> 
            </div>
        </div>
    );
}

export default ShippingItem;
