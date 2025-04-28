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
       return (
           <div className="row mb-3">
               <Link to ={`/store/${this.state.store.id}`} className="list-group-item list-group-item-action">
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
               
           </div>
        );
   }
}

export default SellerStoreView;   