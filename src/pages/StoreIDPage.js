import React from 'react';
import Spinner from '../components/Spinner';
import StoreImageWithDefault from '../components/StoreImageWithDefault';
import * as apiCalls from '../api/apiCalls';
import { withRouterParam } from '../components/withRouterParam';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        console.log("Компонент StoreIdPage смонтирован."); // Логируем монтирование
        this.loadStore();
        this.loadProducts();
    }

    loadStore = () => {
        const storeId = this.props.match.params.id;
        console.log("Загрузка магазина с ID:", storeId);
        if (!storeId) {
            this.setState({ error: 'Ключ магазина не определен.' });
            return;
        }
        this.setState({ isLoadingStore: true });
        apiCalls.getStore(storeId)
            .then(response => {
                console.log("Данные магазина:", response.data);
                this.setState({
                    store: response.data,
                    user: response.data.userDtoInfo,
                    isLoadingStore: false
                });
            })
            .catch(error => {
                console.error("Ошибка при загрузке магазина:", error);
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
            <div className="list-group-item list-group-item-action mb-3">
                <h2>Магазин</h2>
                <div className="d-flex w-100 justify-content-between">
                    <div>
                        <h5 className="mb-1" style={{ color: 'black' }}>{store.storeName}</h5>
                    </div>
                    <StoreImageWithDefault 
                        src={`http://localhost:8080/api/v1/store/storeLogo/${store.logoUrl}`} 
                        width="60" 
                        height="60" 
                        alt="" 
                    />
                    <small>{store.storeWorkingHours}</small>
                </div>
                <p className="mb-1" style={{ color: 'black' }}>{store.storeDescription}</p>
                <small>{store.storeLocation}</small>
            </div>
        ) : null;

        let productsContent = (isLoadingProducts || isLoadingStore || !user) ? (
            <Spinner />
        ) : (
            <div className="row mb-3" style={{ color: 'black' }}>
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card shadow-sm">
                            <img 
                                src={`http://localhost:8080/api/v1/product/productImage/${product.imageUrl}`} 
                                className="card-img-top" 
                                alt={product.name} 
                                style={{ height: '300px', objectFit: 'cover' }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-muted">{product.price} ₽</span>
                                    {this.props.loggedInUserRole === 'SELLER' && this.props.loggedInUserId === user.id && (
                                        <Link to="/product/update" state={{ product: product }} className="btn btn-primary btn-sm">Редактировать</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );

        return (
            <div data-testid="storepage">
                {storeContent}

                {this.props.loggedInUserRole === 'SELLER' && this.props.loggedInUserId === user?.id && (
                    <Link 
                        to="/product/add"
                        state={{ storeId: store?.storeId }}
                        className="btn btn-primary mb-3"
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
