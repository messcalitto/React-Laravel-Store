import React from 'react';
import { config } from '../config';


const ImageFieldRow = ({title, image, value}) => {

    if (value) {
        image = value;
    }
    
    if (!Array.isArray(image)) {
        image = [image];
    }
    
    // image = image.map(image => image?.data_url ? image.data_url : image);

    return (
        <div className="userViewRow">
            <div className="userViewHeader">
                {title}
            </div>
            <div className="userViewData image-grid">
            
            {image && image.map((image, index) => (
            <div key={index} className="image-item">
                <img src={`${config.remoteHost}/uploads/${image}`} alt=""  />
            </div>
            ))}
            
            </div>
        </div>
    );
}

export default ImageFieldRow;
