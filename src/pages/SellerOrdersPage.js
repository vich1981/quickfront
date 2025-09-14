import React, { Component } from 'react';
//import axios from 'axios';
import Spinner from '../components/Spinner';
import SellerStoreOrdersView from '../components/SellerStoreOrdersView';
import * as apiCalls from '../api/apiCalls';

class SellerOrdersPage extends Component {

    state = {
        stores: [],
        isLoadingStores: false,
        error: ''
    }
    componentDidMount(){
        this.setState({isLoadingStores: true});
        this.loadStores();
            //this.setState({isLoadingStores: false});
            // apiCalls.loadMyStores().then(response => {
            
            // });
    }
    loadStores = () => {
        //e.preventDefault();

        apiCalls.getMyStores()
            .then(response => {
                this.setState({
                    stores: response.data,
                    isLoadingStores: false
                })
            })
            .catch(error => {
                console.error('Невозможно получить магазин');
                this.setState({
                    isLoadingStores: false,
                    error: 'Невозможно получить магазины.'
                })
            });
    };
    render() {
        let myStores;
        if(this.state.isLoadingStores){
            return (
                <Spinner />
            );

        }
        if(this.state.stores) {
            myStores = (
                <div>
                    <h2>Заказы в магазинах</h2>
                    <div className="list-group">
                        {this.state.stores.map((store) => {
                            let key = `store-id-${store.id}`;
                            return (
                                <SellerStoreOrdersView key={key} store={store} />
                            );
                        })}
                    </div>
                </div>
            )
        }
        return (
            <div>
                {myStores}
                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
            </div>
        );
        
    };
}

export default SellerOrdersPage;