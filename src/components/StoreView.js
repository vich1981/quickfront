
 import React, { Component } from 'react';
//  import ProfileImageWithDefault from './ProfileImageWithDefault';
//  import { format } from 'timeago.js';
 import { Link } from 'react-router-dom';
 
class StoreView extends Component {
    
    render(){
        const { store } = this.props;
        return (
            <div>
                <Link to ={`/store/${store.storeId}`} class="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <div> 
                            <h5 className="mb-1">{store.name}</h5>
                            status: {store.status}
                        </div>
                        
                        <p><img src={store.logoUrl} width="80" height="60" alt="" /></p>
                        <small>{store.workingHours}</small>
                    </div>
                    <p className="mb-1">{store.description}</p>
                    <small>{store.location}</small>
                </Link>
                
            </div>
         );
    }
}

export default StoreView;       
    