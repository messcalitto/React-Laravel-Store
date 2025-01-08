import React from 'react';

const FieldRow = ({title, name, value, type='text'}) => {
    return (
    <div>
        <label htmlFor={name}>{title}</label>
        <input 
            name={name} 
            type={type}
            className="border-gray-300 mt-1 block w-full rounded-md" 
            required
            defaultValue={value} 
        />
    </div>
    );
}

export default FieldRow;
