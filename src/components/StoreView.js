
 import React, { Component } from 'react';
 import StoreImageWithDefault from './StoreImageWithDefault';
//  import { format } from 'timeago.js';
 import { Link } from 'react-router-dom';
 
class StoreView extends Component {
    
    render(){
        const { store } = this.props;
        return (
            <div>
                <Link to ={`/store/${store.storeId}`} class="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                        <div className="col-4"> 
                            <h5 className="mb-1">{store.storeName}</h5>
                            <p className="mb-1">{store.storeDescription}</p>
                    <small>{store.storeLocation}</small>
                            {/* status: {store.status} */}
                        </div>
                        <div className="col-4">
                            <p>
                                <StoreImageWithDefault 
                                    src={`http://localhost:8080/api/v1/store/storeLogo/${store.logoUrl}`} 
                                    width="60" 
                                    height="60" 
                                    alt="" 
                                />
                            </p>
                        </div>
                        
                        
                        <small>{store.storeWorkingHours}</small>
                    </div>
                    
                </Link>
                
            </div>
         );
    }
}

export default StoreView;       
    