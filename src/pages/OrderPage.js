import React from 'react';
import { withRouterParam } from '../components/withRouterParam';
import { connect } from 'react-redux';
import OrderProductView from '../components/OrderProductView';
import * as apiCalls from '../api/apiCalls';
import Spinner from '../components/Spinner';
import StoreImageWithDefault from '../components/StoreImageWithDefault';

class OrderPage extends React.Component{

    state = {
        //cart: this.props.loggedInUser.cart,
        //role: this.props.loggedInUser.role,
        userId: this.props.loggedInUser.id,
        isLoadOrder: false,
        isLoadStore: false,
        order: undefined,
        store: undefined,
        error: undefined
    };
    componentDidMount(){
        this.loadOrder();
    }


    loadOrder = () => {
        const orderId = this.props.match.params.id;
        if(!orderId){
            this.setState({error: 'Ключ магазина не определен.'})
            return;
        }
        this.setState({isLoadOrder: true});
        apiCalls.getOrder(orderId)
        .then(response => {
            this.setState({
                order: response.data,
                isLoadOrder: false
            });
        })
        .catch((error) => {
            this.setState({
                error
            })
        });
    }
    loadStore = () => {
        let storeId;
        if(this.state.order){
            storeId = this.state.order.storeId;
        }
        
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


    render() {
        let orderContent;
        let storeContent;
        let totalPrice = 0;
        if(this.state.isLoadStore){
            storeContent = (
                <Spinner />
            );
        }
        else{
            if(!this.state.store){
                storeContent = (
                    <div>
                        <button
                            className="btn btn-primary mb-2"
                            onClick={this.loadStore}
                        >
                            О магазине
                        </button>
                    </div>
                );
            }
            else storeContent = (
                <div class="list-group-item list-group-item-action mb-3">
                    <h5>из магазина</h5>
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
            )
        }
        if(this.state.isLoadOrder){
            orderContent = (
                <Spinner />
            );
        } 
        else{
            if(!this.state.order){
                orderContent = (
                    <div>
                        <h5>Ошибка заказа, свяжитесь с продавцом</h5>
                    </div>
                );
            }
            else {
                let status;
                switch(this.state.order.status){
                    case 'PENDING':
                        status = 'обрабатывается';
                        break;
                    case 'ASSEMBLED':
                        status = 'собран';
                        break;
                    case 'PAID':
                        status = 'оплачен';
                        break;
                    case 'DELIVERED':
                        status = 'доставляется';
                        break;
                    case 'COMPLETED':
                        status = 'завершен';
                        break;
                    default:
                        status = 'статус заказа не определен';
            
                }
                orderContent = (
                <div>
                    <h2>Заказ № {this.state.order.id} статус: {status}</h2>
                    {storeContent}
                    <ol className="list-group list-group-numbered">
                        {this.state.order.products.map((product) => {
                            totalPrice += Number(product.price)*product.quantity;
                            return <OrderProductView key={product.id} product={product}/>;
                        })}
                    </ol>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="ms-4 me-auto">
                            <div className="fw-bold">Общая сумма:</div>
                        </div>
                        <div className="fw-bold me-3">{totalPrice} р.</div>
                    </div>     
                </div>
                );
            }
        } 
          
        return (
            <div data-testid="orderpage">

                {orderContent}

                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
            </div>
        )
    }    
}

OrderPage.defaultProps = {
    match: {
        params: {}
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
};

export default connect(mapStateToProps)(withRouterParam(OrderPage));