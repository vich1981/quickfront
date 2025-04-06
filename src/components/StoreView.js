
 import React, { Component } from 'react';
//  import ProfileImageWithDefault from './ProfileImageWithDefault';
//  import { format } from 'timeago.js';
 import { Link } from 'react-router-dom';
 
class StoreView extends Component {
    
    render(){
        const { store } = this.props;
        return (
            <a href="/store/{store.storeId}" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{store.storeName}</h5>
                    <p><img src={store.logoUrl} width="80" height="60" alt="" /></p>
                    <small>{store.storeWorkingHours}</small>
                </div>
                <p class="mb-1">{store.storeDesctiption}</p>
                <small>{store.storeLocation}</small>
            </a>
         );
    }
}

export default StoreView;       
    