import React, { Component } from 'react';
import StoreImageWithDefault from './StoreImageWithDefault';
//  import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

class OrderView extends Component {
   
   render(){
       const { order } = this.props;
       const od = order.orderDate;
       let date = od.slice(8,10) + '.' + od.slice(5,7) + '.' + od.slice(0,4) + ' ' + od.slice(11,16);
       let status;
       switch(order.status){
        case 'PENDING':
            status = 'Обрабатывается';
            break;
        case 'ASSEMBLED':
            status = 'Собран';
            break;
        case 'PAID':
            status = 'Оплачен';
            break;
        case 'DELIVERED':
            status = 'Доставляется';
            break;
        case 'COMPLETED':
            status = 'Завершен';
            break;
        default:
            status = 'Статус заказа не определен';

       }
       return (
           <div>
               <Link to ={`/orders/${order.id}`} class="list-group-item list-group-item-action">
                   <div className="d-flex w-100 justify-content-between">
                       <div> 
                           <h5 className="mb-1">Заказ номер №{order.id} от {date}</h5>
                           статус: {status}
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