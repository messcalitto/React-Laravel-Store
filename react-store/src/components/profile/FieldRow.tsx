import React from 'react';

interface FieldRowProps {
    title: string;
    name: string;
    value: string;
    type?: string;
}

const FieldRow: React.FC<FieldRowProps> = ({title, name, value, type='text'}) => {
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
