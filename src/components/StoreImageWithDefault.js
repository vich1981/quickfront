import React from 'react';
import defaultPicture from '../assets/defaultStore.webp';

const StoreImageWithDefault = (props) => {
    let imageSource = defaultPicture;
    if(props.image){
        imageSource = `/images/store/${props.image}`;
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

export default StoreImageWithDefault;