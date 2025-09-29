import React, { Component } from 'react';
import StoreImageWithDefault from './StoreImageWithDefault';
import { Link } from 'react-router-dom';
import '../css/StoreView.css';

class StoreView extends Component {
    
    render(){
        const { store } = this.props;
        return (
            <div 
                className="store-card mb-3"
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}  
            >  
                <Link 
                    to={`/store/${store.storeId}`}
                    className="list-group-item list-group-item-action text-decoration-none"
                >        
                    <div className="row g-3 align-items-center">

                        <div className="col-12 col-md-6 col-lg-4 order-2 order-md-1 order-lg-1">
                            <h3 className="mb-2 fs-5" style={{ color: 'inherit' }}>{store.storeName}</h3>
                            <p className="mb-2 text-muted small" style={{ color: 'inherit' }}>{store.storeDescription}</p>
                            <small className="text-muted">{store.storeLocation}</small>
                        </div>

                        <div className="col-12 col-md-3 col-lg-4 order-1 order-md-2 order-lg-2 text-center">
                            <StoreImageWithDefault 
                                src={`https://quick-cart.ru/api/store/storeLogo/${store.logoUrl}`}
                                style={{objectFit: 'cover', borderRadius: '4px'}} 
                                width="100" 
                                height="100" 
                                alt={store.storeName} 
                            />
                        </div>

                        <div className="col-12 col-md-3 col-lg-4 order-3 order-md-3 order-lg-3 text-center text-md-end text-lg-end">
                            <small className="text-muted">{store.storeWorkingHours}</small>
                        </div>   
                    </div>            
                </Link>
            </div>
        );
    }
}

export default StoreView;
