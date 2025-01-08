import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div className='LoadWrapper'>
            <ReactLoading className='center' type="spin" color="#00f" height={50} width={50} />
        </div>
    );
}

export default Loading;
