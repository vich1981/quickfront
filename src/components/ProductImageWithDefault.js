import React from 'react';
import defaultPicture from '../assets/defaultStore.webp';

const ProductImageWithDefault = (props) => {
    let imageSource = defaultPicture;
    if(props.image){
        imageSource = `/images/product/${props.image}`;
    }
    //eslint-disable-next-line
    return(
        <img 
            {...props} 
            src={props.src || imageSource}
            onError={(event) => {
                event.target.src = defaultPicture;
            }}
        />
     ); 
};

export default ProductImageWithDefault;