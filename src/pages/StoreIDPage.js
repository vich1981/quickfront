import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import StoreImageWithDefault from '../components/StoreImageWithDefault';
import ProductView from '../components/ProductView';
import ProductSellerView from '../components/ProductSellerView';
import * as apiCalls from '../api/apiCalls';
import { withRouterParam }  from '../components/withRouterParam';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StoreIdPage extends React.Component{
    state = {
        user: undefined,
        store: undefined,
        products: [],
        backet:[],
        isLoadingStore: false,
        isLoadingProducts: false,
        error: undefined

    };

    componentDidMount(){
        this.loadStore();
        this.loadProducts();
    }

    loadStore = () => {
        const storeId = this.props.match.params.id;
        if(!storeId){
            this.setState({error: 'Ключ магазина не определен.'})
            return;
        }
        this.setState({isLoadingStore: true });
        apiCalls.getStore(storeId)
        .then(response => {
            this.setState({ 
                store: response.data, 
                isLoadingStore: false,
                user: response.data.userDtoInfo 
            })
        })
        .catch(error => {
            console.error(error);
            this.setState({ 
                isLoadingStore: false,
                error: 'Невоможно получить магазин.'
            });
        });
    }
    loadProducts = () => {
        const storeId = this.props.match.params.id;
        if(!storeId){
            return;
        }
        this.setState({isLoadingProducts: true});
        apiCalls.getProducts(storeId)
        .then(response => {
            this.setState({ products: response.data, isLoadingProducts: false });
        })
        .catch(error => {
            console.error(error);
            this.setState({
                isLoadingProducts: false,
                error: 'Невозможно получить продукты.'
            });
        });
    }
    render() {
        let storeContent;
        let productsContent;
        if(this.state.isLoadingStore){
            storeContent = (
                <Spinner />
            );
        }
        else {
            if(this.state.store) storeContent = (
                <div class="list-group-item list-group-item-action mb-3">
                    <h2>Магазин</h2>
                    <div className="d-flex w-100 justify-content-between">
                        <div> 
                            <h5 className="mb-1">{this.state.store.storeName}</h5>
                        </div>
                        
                        <p>
                            <StoreImageWithDefault 
                                src={`http://localhost:8080/api/v1/store/storeLogo/${this.state.store.logoUrl}`} 
                                width="60" 
                                height="60" 
                                alt="" 
                            />
                        </p>
                        <small>{this.state.store.storeWorkingHours}</small>
                    </div>
                    <p className="mb-1">{this.state.store.storeDescription}</p>
                    <small>{this.state.store.storeLocation}</small>
                </div>
            );
        }
        if(this.state.isLoadingProduct || this.state.isLoadingStore || !this.state.user){
            productsContent = (
                <Spinner />
            );
        }
        else {
            if(this.props.loggedInUserRole === 'SELLER' && this.props.loggedInUserId === this.state.user.id){  
                productsContent = (
                    <div className="mb-3">
                        {this.state.products && <div className="row mb-3">
                            {this.state.products.map((product) => {
                                return <ProductSellerView key={product.id} product = {product} />;
                            })}
                        </div>}
                        <Link 
                            to="/product/add"
                            state={{storeId: this.state.store.storeId}}
                            className="nav-link"
                        >
                            Добавить продукт
                        </Link>
                    </div>       
                );                   
            }
            else productsContent = (
                <div className="row mb-3">
                    {this.state.products.map((product) => {
                        return <ProductView key={product.id} product = {product} />;
                    })}
                </div>
            );  
        }        
        return (
            <div data-testid="storepage">

                {storeContent}
            
                {productsContent}
        
                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}

            </div>
            
        );
    }
}

StoreIdPage.defaultProps = {
    match: {
        params: {}
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUserRole: state.role,
        loggedInUserId: state.id
    }
};

export default connect(mapStateToProps)(withRouterParam(StoreIdPage));