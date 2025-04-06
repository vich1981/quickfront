import React, { Component } from 'react';
import * as apiCalls from '../api/apiCalls';
import Spinner from './Spinner';
import HoaxView from './HoaxView';

class SellerStore extends Component {

    state = {
        page: {
            content: []
        },
        isLoadingStores: false
    }
    async componentDidMount(){
        this.setState({isLoadingStores: true});
        const response = await axios.get('http://localhost:8080/api/v1/store/my-store', {
            withCredentials: true });
        this.setState({isLoadingStores: false});
        // apiCalls.loadHoaxes(this.props.user).then(response => {
        //     this.setState({page: response.data, isLoadingHoaxes: false})
        // });
    }
    render() {
        if(this.state.isLoadingStores){
            return (
                <Spinner />
            );

        }
        if(this.state.page.content.length === 0) {
            return (
                <div className="card-header text-center">
                    There are no stores
                </div>
            );
        }
        return (
            <div>
                {this.state.page.content.map((store) => {
                    return <StoreView key={store.id} store={store} />;
                })}
                {this.state.page.last === false && (
                    <div className="card card-header text-center">
                        Load More
                    </div>
                )}
            </div>
        );
        
    };
}

export default SellerStore;