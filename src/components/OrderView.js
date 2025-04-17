import React, { Component } from 'react';
import StoreImageWithDefault from './StoreImageWithDefault';
//  import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

class OrderView extends Component {
   
   render(){
       const { order } = this.props;
       return (
           <div>
               <Link to ={`/order/${order.orderId}`} class="list-group-item list-group-item-action">
                   <div className="d-flex w-100 justify-content-between">
                       <div> 
                           <h5 className="mb-1">{order.name}</h5>
                           status: {order.status}
                       </div>
                       
                       {/* <p>
                           <StoreImageWithDefault 
                               src={`http://localhost:8080/api/v1/store/storeLogo/${store.logoUrl}`} 
                               width="60" 
                               height="60" 
                               alt="" 
                           />
                       </p> */}
                       {/* <small>{store.workingHours}</small>
                   </div>
                   <p className="mb-1">{order.description}</p>
                   <small>{store.location}</small> */}
                   </div>
               </Link>
               
           </div>
        );
   }
}

export default OrderView; 