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

        // try {
        //     const response = await axios.get('http://localhost:8080/api/v1/store/my/store', { withCredentials: true });
        //     this.setState({
        //         stores: response.data, 
        //         isLoadingStores: false
        //     });
            

        //     console.log(response.data);

        // } catch (error) {
        //     this.setState({
        //         error: 'Невозможно получить магазин, проверьте права доступа.',
        //         isLoadingStores: false
        //     });
        //     console.error(error);
        // }
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
                    <h2>Заказы в магазинах</h2>
                    <div className="list-group">
                        {this.state.stores.map((store) => {
                            // store.logoUrl = this.getUrl(store);
                            return (
                            <div>
                                <SellerStoreOrdersView key={store.storeId} store={store} />
                            </div>);
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

export default SellerOrdersPage;