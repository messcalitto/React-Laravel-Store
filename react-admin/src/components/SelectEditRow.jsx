import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SelectEditRow = ({title, value, options, onChange, width="300px", required=false}) => {
    
    value = value? value : '';
    options = options? options : '';
    
    if (Array.isArray(options)) {
        options = options.map(option => option?.id ? option : {id: option, name: option});
    }

    return (
        <div className="userViewRow">
                <div className="userViewHeader">
                    Category
                </div>
                <div className="userViewData">
                    
                    <Select
                        required={required}
                        value={ value }
                        onChange={onChange}
                        sx={{width:width}}
                        >
                        {Array.isArray(options) && options.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                        ))}
                        
                    </Select>
                    
                </div>
            </div>
    );
}

export default SelectEditRow;
