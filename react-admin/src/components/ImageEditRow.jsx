import React from 'react';
import ImageUploading from 'react-images-uploading';
import { config } from '../config';



const ImageEditRow = ({title, value, onChange}) => {
    
    // console.log("value=",value);
    if (value !== '' && !Array.isArray(value)) value = [value];
    
    const onChangeImg = (imageList, addUpdateIndex) => {
        
        const images = imageList.map(img => img.data_url? img.data_url : img);
        // console.log("images=",images);
        onChange({ target: { value: images }});
        // value = images;
        // console.log("value=",value);
    };


    const image = Array.isArray(value) ? value.map(img => {
        
        if (typeof img === 'string' && img?.startsWith('data:image')){
            return img;
        } else if (typeof img === 'string' && !img?.startsWith('http://')) {
            return config.remoteHost+'/uploads/'+img;
        } 
         return img;
    }) : value;

// console.log("image=",image);

    return (
        <div className="userViewRow">
                <div className="userViewHeader">
                    {title}
                </div>
                <div className="userViewData">
                
            <ImageUploading
                multiple
                value={image}
                onChange={onChangeImg}
                maxNumber={10}
                dataURLKey="data_url"
            >
                {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                
                }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <button
                    type="button"
                    
                    onClick={onImageUpload}
                    
                    >
                    Browse
                    </button>
                    &nbsp;
                    <button type="button" onClick={onImageRemoveAll}>Remove all images</button>
                    
                    <div className="image-grid">
                    {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image} alt="" />
                        <div className="image-item__btn-wrapper">
                        {/* <button onClick={() => onImageUpdate(index)} type="button">Update</button> */}
                        <button onClick={() => onImageRemove(index)} type="button">Remove</button>
                        </div>
                    </div>
                    ))}
                    </div>

                </div>
                )}
            </ImageUploading>

            </div>
        </div>
    );
}

export default ImageEditRow;
