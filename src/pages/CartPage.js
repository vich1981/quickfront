import React from 'react';
import { withRouterParam } from '../components/withRouterParam';
import { connect } from 'react-redux';
import CartProductView from '../components/CartProductView';
import * as apiCalls from '../api/apiCalls';

class CartPage extends React.Component{

    state = {
        role: this.props.loggedInUser.role,
        userId: this.props.loggedInUser.id,
        deliveryAddress: this.props.loggedInUser.location,
        paymentMethod: 'наличные',
        orderStatus: undefined,
        orders:[],
        error: undefined
    };
    componentDidMount(){
        this.setState({orderStatus: undefined});
    }

    onClickOrder = () => {
        
        const formData = new FormData();
        formData.append('products', JSON.stringify(this.props.loggedInUser.cart));
        formData.append('userId', this.state.userId);
        formData.append('deliveryAddress', this.state.deliveryAddress);
        formData.append('paymentMethod', this.state.paymentMethod);
        apiCalls.createOrder(formData)
        .then(response => {
            this.setState({
                orders: response.data,
                orderStatus: 'Ваш заказ успешно создан'
            },() => {
                const action = {
                    type:'removeAll',
                    payload: this.state.product
                };
                this.props.dispatch(action);
            });
        })
        .catch((error) => {
            this.setState({
                error
            })
        });

        
    }

    onChangeDeliveryAddress = (event) => {
        this.setState({deliveryAddress: event.target.value});
    }

    onChangePaymentMethod = (event) => {
        this.setState({paymentMethod: event.target.value})
    }

    render() {
        let productContent;
        const cart = this.props.loggedInUser.cart;
        let totalPrice = 0;
        if(this.state.role !== 'BUYER'){
            productContent = (
                <div><h4>Корзина доступна только для покупателей</h4></div>
            )
        } 
        else{
            if(this.state.orderStatus){
                productContent = (
                    <div>
                        <div><h4>{this.state.orderStatus}</h4></div>
                        <div>
                            {this.state.orders.map((order) => {
                                return (<div>Сформирован заказ {order.id}</div>);
                            })}
                        </div>
                    </div>
                    
                )
            }
            else if(!cart || (cart.length === 0)){
                productContent = (
                    <div><h4>Корзина продуктов пуста</h4></div>
                );
            }
            else {
                productContent = (
                    <div>
                        <h2>Корзина</h2>
                        <ol className="list-group list-group-numbered">
                            {cart.map((product) => {
                                totalPrice += Number(product.price)*product.quantity;
                                return <CartProductView key={product.id} product={product}/>;
                            })}
                        </ol>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="ms-4 me-auto">
                                <div className="fw-bold">Общая сумма:</div>
                            </div>
                            <div className="fw-bold me-3">{totalPrice} р.</div>
                        </div>
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <label>Адрес доставки</label>
                                <input
                                    className="input-group mb-2"
                                    type="deliveryAddress"
                                    placeholder="Укажите адрес доставки"
                                    value={this.state.deliveryAddress}
                                    onChange={this.onChangeDeliveryAddress}
                                    required
                                />
                                <label>Способ оплаты</label>
                                <select
                                    className="form-select mb-3"
                                    aria-label="Способ оплаты"
                                    value={this.state.paymentMethod}
                                    onChange={this.onChangePaymentMethod}
                                    required

                                >
                                    <option value="CASH">Наличные</option>
                                    <option value="CARD">Картой при получении</option>
                                    <option value="ONLINE">Картой онлайн</option>
                                    <option value="SBP">По СБП</option>
                                </select>
                                <div className = "row justify-content-center">
                                    <div className = "col-5">
                                        <button
                                            className="btn btn-success"
                                            onClick={this.onClickOrder}
                                        >
                                            Заказать
                                        </button>
                                    </div> 
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                )
            }
        } 
          
        return (
            <div data-testid="productpage">

                {productContent}

                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
            </div>
        )
    }    
}

CartPage.defaultProps = {
    match: {
        params: {}
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
};

export default connect(mapStateToProps)(withRouterParam(CartPage));