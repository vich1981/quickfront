import React, { Component } from 'react';
import * as apiCalls from '../api/apiCalls';
import axios from 'axios';
import Spinner from './Spinner';
import OrderView from './OrderView';
import { Link } from 'react-router-dom';

class BuyerStore extends Component {

    state = {
        orders: [],
        userId: this.props.userId,
        isLoadingOrders: false,
        error: ''
    }
    componentDidMount(){
        this.setState({isLoadingOrders: true});
        this.handleStoreRegister();
        //this.setState({isLoadingStores: false});
        // apiCalls.loadMyStores().then(response => {
        
        // });
    }
    handleStoreRegister = async (e) => {
        //e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/orders/${this.state.userId}`, { withCredentials: true });
            this.setState({
                orders: response.data, 
                isLoadingOrders: false
            });
            

            console.log(response.data);

        } catch (error) {
            this.setState({error: 'Failed to recieve store. Please check your credentials.'});
            console.error(error);
        }
    };
    // getUrl = async(store) =>{
    //     try{
    //         const response = await axios.get(`http://localhost:8080/api/v1/store/storeLogo/${store.logoUrl}`);
    //         this.setState({
    //             store: response.data
    //         });
    //         console.log(response.data);
    //     } catch(error){
    //         this.setState({error: 'Невозможно получить изображение logo.'});
    //         console.error(error);
    //     }
    // };
    render() {
        let myOrders;
        if(this.state.isLoadingOrders){
            return (
                <Spinner />
            );

        }
        if(this.state.orders) {
            myOrders = (
                <div>
                    <h2>My orders</h2>
                    <div className="list-group">
                        {this.state.orders.map((order) => {
                            // store.logoUrl = this.getUrl(store);
                            return <OrderView key={order.id} order={order} />;
                        })}
                    </div>
                </div>
            // mapStore = (this.state.content.map((store) => {
            //     return <StoreView key={store.id} store={store} />;
            // }));
            )
        }
        return (
            <div>
                {myOrders}
                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
                
                <Link to="/store/all/store" className="nav-link">
                        У вас нет ни одного заказа
                </Link>
                
            </div>
        );
        
    };
}

export default BuyerStore;