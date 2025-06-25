import React, { Component } from 'react';
import StoreImageWithDefault from './StoreImageWithDefault';
//  import { format } from 'timeago.js';
import * as apiCalls from '../api/apiCalls';
import Spinner from './Spinner';
import OrderView from './OrderView';
import { Link } from 'react-router-dom';

class SellerStoreOrdersView extends Component {
    state = {
        store: this.props.store,
        orders: [],
        isLoadOrders: false,
        displayArchive: false,
        error: ''
    };

    componentDidMount(){
        this.loadOrders();
    }

    loadOrders = () => {
        this.setState({isLoadOrders: true});
        apiCalls.getStoreOrders(this.state.store.id)
        .then(response => {
            this.setState({
                orders: response.data,
                isLoadOrders: false
            });
        })
        .catch((error) => {
            this.setState({
                error
            })
        });        
    }

    toggleArchive = () => {
        if(this.state.displayArchive) this.setState({displayArchive: false});
        else this.setState({displayArchive: true});
    }



   render(){
        let ordersContent;
        let archiveButton = this.state.displayArchive ? 'Убрать завершенные': 'Показать завершенные';

        if(this.state.isLoadOrders){
            ordersContent = (
                <Spinner />
            );
        }
        else if(!this.state.orders){
            ordersContent = (
                <h5>В этом магазине нет заказов</h5>
            );
        }
        else ordersContent = (
            <div className="mb-3">
                <div className="row mb-3">
                    {this.state.orders.map((order) => {
                        if(!this.state.displayArchive && order.status === 'COMPLETED')return;
                        return <OrderView key={order.id} order = {order} />;
                    })}
                </div>
                <button
                    type="button" 
                    className="btn btn-primary"
                    onClick={this.toggleArchive}
                >
                    {archiveButton}{this.state.displayArchive}
                </button>
            </div>       
        );


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
               {ordersContent}
           </div>
        );
   }
}

export default SellerStoreOrdersView;   