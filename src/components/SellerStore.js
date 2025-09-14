import React, { Component } from 'react';
import * as apiCalls from '../api/apiCalls';
import axios from 'axios';
import Spinner from './Spinner';
import SellerStoreView from './SellerStoreView';
import { Link } from 'react-router-dom';

class SellerStore extends Component {

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
                    <h2>Мои магазины</h2>
                    <div className="list-group">
                        {this.state.stores.map((store) => {
                            return (
                                <SellerStoreView key={store.id} store={store} />
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
                <Link to="/store/register" className="btn btn-primary">
                        Добавить новый магазин
                </Link>
                
            </div>
        );
        
    };
}

export default SellerStore;