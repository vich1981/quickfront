import React, { Component } from 'react';
import StoreImageWithDefault from './StoreImageWithDefault';
//  import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

class SellerStoreCard extends Component {
    state = {
        store: this.props.store,
        error: ''
    };
    render(){
        let store = this.state.store;
        return (
            <div className="row align-items-center mb-1">
                <div 
                    className="store-card col mb-1"
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}  
                >  
                    <Link 
                        to ={`/store/${store.id}`}
                        className="list-group-item list-group-item-action"
                        
                    >        
                        <div className="row d-flex w-100">
                            <div className="col-4">
                                <h5 className="mb-2" style={{ color: 'black' }}>{store.name}</h5>
                                <p className="mb-1" style={{ color: 'black' }}>статус: {store.status}</p>
                                <p className="mb-1" style={{ color: 'black' }}>{store.description}</p>
                                <small>{store.location}</small>
                            </div>
                            <div className="col-md-3 ms-md-auto align-self-center">
                                <StoreImageWithDefault 
                                    src={`https://quick-cart.ru/api/store/storeLogo/${store.logoUrl}`}
                                    style={{objectFit: 'cover', borderRadius: '4px'}} 
                                    width="100" 
                                    height="100" 
                                    alt="" 
                                />
                            </div>
                            <div className="col-md-3 ms-md-auto align-self-center text-end">
                                <small>{store.workingHours}</small>
                            </div>   
                        </div>            
                    </Link>
                </div>
            </div>
        );
    }
}

export default SellerStoreCard;