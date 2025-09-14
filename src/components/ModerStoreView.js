import React, { Component } from 'react';
import StoreImageWithDefault from './StoreImageWithDefault';
import axios from 'axios';
import * as apiCalls from '../api/apiCalls';
//  import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

class ModerStoreView extends Component {

    state = {
        store: this.props.store,
        error: ''
    };


    handleStoreModeration = () => {
        const status = this.state.store.storeStatus;
        const formData = new FormData();
        formData.append('status', status);
        apiCalls.patchModerationStore(this.state.store.storeId, status)
        .then((response) => {
            this.setState({ store : {
                                ...this.state.store,
                                storeStatus: response.data.status}})

        })
        .catch((error) => {
            this.setState({error: 'Невозможно получить информацию о магазинах, проверьте права доступа.'});
            console.error(error);
        });
        //e.preventDefault();
        // try {
        //     const status = this.state.store.storeStatus;
        //     const formData = new FormData();
        //     formData.append('status', this.state.store.storeStatus);
        //     const response = await axios.patch(`http://localhost:8080/api/v1/moderation/manage/store/${this.state.store.storeId}`, {status}, { withCredentials: true });
        //     this.setState({
        //         //stores: response.data, 
        //         isLoadingStores: false
        //     });
            

        //     console.log(response.data);

        // } catch (error) {
        //     this.setState({error: 'Невозможно получить информацию о магазинах, проверьте права доступа.'});
        //     console.error(error);
        // }
    }
    onChangeStatus = (event) => {
        const store = { ...this.state.store };
        store.storeStatus = event.target.value;
        this.setState({store: store});
    }


   render(){
       return (
           <div className="row justify-content-center">
                <div className="col-6 mb-3">
                    <Link to ={`/store/${this.state.store.storeId}`} className="list-group-item list-group-item-action col-3">
                        {/* <div className="d-flex w-50 justify-content-between"> */}
                            <div> 
                                <h5 className="mb-1">{this.state.store.storeName}</h5>
                                <StoreImageWithDefault 
                                    src={`http://localhost:8080/api/v1/store/storeLogo/${this.state.store.logoUrl}`} 
                                    width="60" 
                                    height="60" 
                                    alt="" 
                                />
                            </div>
                            
                            {/* <small>{store.workingHours}</small> */}
                        {/* </div> */}
                        <p className="mb-1">{this.state.store.storeDescription}</p>
                        <small>{this.state.store.storeLocation}</small>
                    </Link>
                </div>
                <div className="col-6 justify-content-center mb-3">
                    <div className="row justify-content-center align-items-center">
                    {/* <div className="d-flex w-100 justify-content-between mb-3"> */}
                    <div className="col-3 mb-2">
                        <h5>Status:</h5>
                    </div>
                    <div className="col-6 mb-3">       
                            <select
                                className="form-select"
                                aria-label="Выберите права пользователя"
                                value={this.state.store.storeStatus}
                                onChange={this.onChangeStatus}
                                required

                            >
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="PENDING">PENDING</option>
                                <option value="BLOCKED">BLOCKED</option>
                            </select>
                    </div>              
                        
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6 mb-3">
                            <button 
                                className="btn btn-primary mb-3" 
                                type="button"
                                onClick={this.handleStoreModeration} 
                            >
                                Изменить
                            </button>
                        </div>
                    </div> 
               </div>
           </div>
        );
   }
}

export default ModerStoreView;  