import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='LoadWrapper'>
            <PulseLoader color="#0d6efd" size={12} />
        </div>
    );
}

export default Loading;
