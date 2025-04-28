import React, { Component } from 'react';
import * as apiCalls from '../api/apiCalls';
import axios from 'axios';
import Spinner from './Spinner';
import ModerStoreView from './ModerStoreView';
import { Link } from 'react-router-dom';

class ModerStore extends Component {

    state = {
        stores: [],
        isLoadingStores: false,
        error: ''
    }
    componentDidMount(){
        this.setState({isLoadingStores: true});
        this.handleStoreRegister();
        //this.setState({isLoadingStores: false});
        // apiCalls.loadMyStores().then(response => {
        
        // });
    }
    handleStoreRegister = async (e) => {
        //e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/api/v1/moderation/manage/store', { withCredentials: true });
            this.setState({
                stores: response.data, 
                isLoadingStores: false
            });
            

            console.log(response.data);

        } catch (error) {
            this.setState({error: 'Невозможно получить информацию о магазинах, проверьте права доступа.'});
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
        let myStores;
        if(this.state.isLoadingStores){
            return (
                <Spinner />
            );

        }
        if(this.state.stores) {
            myStores = (
                <div>
                    <h2>Список магазинов</h2>
                    <div className="list-group">
                        {this.state.stores.map((store) => {
                            // store.logoUrl = this.getUrl(store);
                            return <ModerStoreView key={store.storeId} store={store} />;
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
                {myStores}
                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
            </div>
        );
        
    };
}

export default ModerStore;