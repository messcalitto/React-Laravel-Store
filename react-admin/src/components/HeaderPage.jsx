import React from 'react';

const HeaderPage = ({title, children}) => {
    return (
        <div className="userViewHeaderWrappper">
            {title}
            <div className="viewUserButtons">
                {children}
            </div>
        </div>
    );
}

export default HeaderPage;

