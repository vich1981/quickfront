import React from 'react';
import Spinner from '../components/Spinner';
import StoreImageWithDefault from '../components/StoreImageWithDefault';
import ProductView from '../components/ProductView';
import ProductSellerView from '../components/ProductSellerView';
import * as apiCalls from '../api/apiCalls';
import { withRouterParam } from '../components/withRouterParam';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "../css/StoreIDPage.css";

class StoreIdPage extends React.Component {
    state = {
        user: undefined,
        store: undefined,
        products: [],
        isLoadingStore: false,
        isLoadingProducts: false,
        error: undefined
    };

    componentDidMount() {
        this.loadStore();
        this.loadProducts();
    }

    loadStore = () => {
        const storeId = this.props.match.params.id;
        if (!storeId) {
            this.setState({ error: 'Ключ магазина не определен.' });
            return;
        }
        this.setState({ isLoadingStore: true });
        apiCalls.getStore(storeId)
            .then(response => {
                this.setState({
                    store: response.data,
                    user: response.data.userDtoInfo,
                    isLoadingStore: false
                });
            })
            .catch(error => {
                this.setState({
                    isLoadingStore: false,
                    error: 'Невозможно получить магазин.'
                });
            });
    }

    loadProducts = () => {
        const storeId = this.props.match.params.id;
        if (!storeId) {
            return;
        }
        this.setState({ isLoadingProducts: true });
        apiCalls.getProducts(storeId)
            .then(response => {
                this.setState({ products: response.data, isLoadingProducts: false });
            })
            .catch(error => {
                this.setState({
                    isLoadingProducts: false,
                    error: 'Невозможно получить продукты.'
                });
            });
    }

    render() {
        const { store, products, isLoadingStore, isLoadingProducts, error, user } = this.state;

        let storeContent = isLoadingStore ? (
            <Spinner />
        ) : store ? (
            <div className="store-id-card my-3">
                <div className="row d-flex w-100">

                    <div className="col-12 col-md-4 order-2 order-md-1">
                        {/* <h4 className="store-title">Магазин</h4> */}
                        <h5 className="mb-2 store-name">{store.storeName}</h5>
                        <p className="mb-1 store-desc">{store.storeDescription}</p>
                        <small className="store-location">{store.storeLocation}</small>
                    </div>

                    <div className="col-12 col-md-4 order-1 order-md-2 text-center">
                        <StoreImageWithDefault 
                            src={`https://quick-cart.ru/api/store/storeLogo/${store.logoUrl}`}
                            style={{objectFit: 'cover', borderRadius: '4px'}} 
                            width="120" 
                            height="120" 
                            alt="Логотип магазина"
                            className="store-logo"
                        />
                    </div>

                    <div className="col-12 col-md-4 order-3 order-md-3 text-center text-md-end align-self-center">
                        <small className="store-hours">{store.storeWorkingHours}</small>
                    </div>   
                </div>            
            </div>
        ) : null;

        let productsContent = (isLoadingProducts || isLoadingStore || !user) ? (
            <Spinner />
        ) : 
        (this.props.loggedInUserRole === 'SELLER' && this.props.loggedInUserId === user.id) ? (
            <div className="product-list">
                {products.length === 0 && <p className="no-products">У вас ещё нет товаров.</p>}
                {products.map((product) => {
                    return <ProductSellerView key={product.id} product={product} />;
                })}
            </div>
        ) :
        (
            <div className="product-list">
                {products.map((product) => {
                    return <ProductView key={product.id} product={product} />;
                })}
            </div>
        );

        return (
            <div data-testid="storepage">
                {storeContent}

                {this.props.loggedInUserRole === 'SELLER' && this.props.loggedInUserId === user?.id && (
                    <Link 
                        to="/product/add"
                        state={{ storeId: store?.storeId }}
                        className="btn btn-primary add-product-btn"
                    >
                        Добавить продукт
                    </Link>
                )}

                {productsContent}
                {error && <p className="alert alert-danger">{error}</p>}
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
