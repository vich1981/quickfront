import React, { Component } from 'react';
import * as apiCalls from '../api/apiCalls';
import axios from 'axios';
import Spinner from './Spinner';
import StoreView from './StoreView';
import { Link } from 'react-router-dom';

class SellerStore extends Component {

    state = {
        stores: [],
        isLoadingStores: false
    }
    async componentDidMount(){
        this.setState({isLoadingStores: true});
        const response = await axios.get('http://localhost:8080/api/v1/store/my/store', { withCredentials: true });
        //this.setState({isLoadingStores: false});
        // apiCalls.loadMyStores().then(response => {
        this.setState({stores: response.data, isLoadingStores: false});
        // });
    }
    render() {
        let mapStore;
        if(this.state.isLoadingStores){
            return (
                <Spinner />
            );

        }
        if(this.state.content) {
            mapStore = (this.state.content.map((store) => {
                return <StoreView key={store.id} store={store} />;
            }));
        }
        return (
            <div>
                {mapStore}
                
                <Link to="/store/register" className="nav-link">
                        Register new store
                </Link>
                
            </div>
        );
        
    };
}

export default SellerStore;