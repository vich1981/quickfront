
 import React, { Component } from 'react';
 import StoreImageWithDefault from './StoreImageWithDefault';
 import { Link } from 'react-router-dom';
 import '../css/StoreView.css';

 
class StoreView extends Component {
    
    render(){
        const { store } = this.props;
        return (
            <div 
                className="store-card mb-1"
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}  
            >  
                <Link 
                    to ={`/store/${store.storeId}`}
                    className="list-group-item list-group-item-action"
                    
                >        
                    <div className="row d-flex w-100">
                        <div className="col-4">
                            <h3 className="mb-3" style={{ color: 'black' }}>{store.storeName}</h3>
                            <p className="mb-1" style={{ color: 'black' }}>{store.storeDescription}</p>
                            <small>{store.storeLocation}</small>
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
                        <div className="col-md-3 ms-md-auto align-self-center text-start">
                                <div className="row mb-4"><i className="fas fa-clock"> {store.storeWorkingHours}</i></div>
                                <div className="row"><i className="fas fa-phone"> {store.phone||'нет данных'}</i> </div>
                        </div>   
                    </div>            
                </Link>
            </div>
        );
    }
}

export default StoreView;       
    