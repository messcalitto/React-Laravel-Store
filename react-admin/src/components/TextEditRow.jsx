import React from 'react';
import { TextField } from '@mui/material';

const TextEditRow = ({title, value, onChange, required=false, type="text", multiline=false, rows=5, width="300px"}) => {
   
    return (
        
        <div className="userViewRow">
            <div className="userViewHeader">
                {title}
            </div>
            <div className="userViewData">
                
                <TextField sx={{width:width}} type={type} required={required} multiline={multiline} rows={rows} size='small' variant="outlined" value={value || ''} 
                        onChange={onChange} />
                
            </div>
        </div>   
    
    );
}

export default TextEditRow;
