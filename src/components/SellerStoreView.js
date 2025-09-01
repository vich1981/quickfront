import React, { Component } from 'react';
import StoreImageWithDefault from './StoreImageWithDefault';
//  import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

class SellerStoreView extends Component {
    state = {
        store: this.props.store,
        error: ''
    };
    render(){
        let store = this.state.store;
        return (
            <div className="row align-items-center mb-3">
                <div 
                    className="store-card col mb-1"
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
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
                                    src={`http://localhost:8080/api/v1/store/storeLogo/${store.logoUrl}`}
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
                {/* <div className="col">
                    <Link 
                        to ={`/store/${this.state.store.id}`} 
                        className="list-group-item list-group-item-action"
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <div> 
                                <h5 className="mb-1">{this.state.store.name}</h5>
                                status: {this.state.store.status}
                            </div>
                            
                            <p>
                                <StoreImageWithDefault 
                                    src={`http://localhost:8080/api/v1/store/storeLogo/${this.state.store.logoUrl}`} 
                                    width="60" 
                                    height="60" 
                                    alt="" 
                                />
                            </p>
                            <small>{this.state.store.workingHours}</small>
                        </div>
                        <p className="mb-1">{this.state.store.description}</p>
                        <small>{this.state.store.location}</small>
                    </Link>
                </div> */}
                <div className="col-2">
                    <Link 
                        to ="/store/update/"
                        state={{store: this.state.store}} 
                        className="btn btn-primary"
                    >
                        Изменить
                    </Link>
                </div>
                
               
            </div>
        );
    }
}

export default SellerStoreView;   