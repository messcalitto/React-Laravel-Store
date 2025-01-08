import React from 'react';

const TextFieldRow = (props) => {
    const { label, type, ...rest } = props;
    return (
        <div className="mt-4">
            <label className="block font-medium text-sm" htmlFor={type}>
                {label}
            </label>
            <input  className="border-gray-300 rounded-md block mt-1 w-full" 
                    type={type}
                    {...rest} />
        </div>
    );
}

export default TextFieldRow;
