import React, { Component } from 'react';
//  import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

class OrderView extends Component {
   
   render(){
       const { order } = this.props;
       const od = order.orderDate;
       let date = od.slice(8,10) + '.' + od.slice(5,7) + '.' + od.slice(0,4) + ' ' + od.slice(11,16);
       let status;
       let key = `order-id-${order.id}`;
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
            <div key={key} className="row align-items-center mb-1">
                <div 
                    className="col"
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Link to ={`/orders/${order.id}`} className="list-group-item list-group-item-action rounded shadow">
                        <div className="d-flex w-100 justify-content-between">
                            <div> 
                                <h5 className="mb-1">Заказ номер №{order.id} от {date}</h5>
                                статус: {status}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
   }
}

export default OrderView; 