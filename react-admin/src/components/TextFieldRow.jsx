import React from 'react';

const TextFieldRow = ({title, value}) => {
    return (
        
        <div className="userViewRow">
            <div className="userViewHeader">
                {title}
            </div>
            <div className="userViewData">
                {value}
            </div>
        </div>   
    
    );
}

export default TextFieldRow;
