import React from 'react';
import { withRouterParam } from '../components/withRouterParam';
import { connect } from 'react-redux';
import OrderProductView from '../components/OrderProductView';
import * as apiCalls from '../api/apiCalls';
import Spinner from '../components/Spinner';
import StoreImageWithDefault from '../components/StoreImageWithDefault';
import StoreView from '../components/StoreView';

class OrderPage extends React.Component{

    state = {
        role: this.props.loggedInUser.role,
        isLoadOrder: false,
        isLoadStore: false,
        order: undefined,
        status: '',
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
                isLoadOrder: false,
                status: response.data.status
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
            })
        })
        .catch(error => {
            console.error(error);
            this.setState({ 
                isLoadingStore: false,
                error: 'Невозможно получить магазин.'
            });
        });
    }

    handleOrderStatus = () => {
        // Добавить спиннер на кнопку статуса
        const formData = new FormData();
        formData.append('status', this.state.status);
        apiCalls.updateOrderStatus(this.state.order.id, formData)
        .then(response => {
            this.setState({ 
                status: response.data 
            });
        })
        .catch(error => {
            console.error(error);
            this.setState({ 
                error: 'Статус не изменен'
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
                    <div className="mb-2">
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
                <StoreView store={this.state.store} />
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
                let statusContent;
                switch(this.state.order.status){
                    case 'PENDING':
                        status = 'ОБРАБАТЫВАЕТСЯ';
                        break;
                    case 'ASSEMBLED':
                        status = 'СОБРАН';
                        break;
                    case 'PAID':
                        status = 'ОПЛАЧЕН';
                        break;
                    case 'DELIVERED':
                        status = 'ДОСТАВЛЯЕТСЯ';
                        break;
                    case 'COMPLETED':
                        status = 'ЗАВЕРШЕН';
                        break;
                    default:
                        status = 'статус заказа не определен';
            
                }
                if(this.state.role === 'SELLER'){
                    statusContent = (
                        <div className="row row-cols-auto d-flex align-items-center mb-2">
                            <div className="col align-self-bottom lh-1 mb-2">
                                статус:
                            </div>
                            <div className="col mb-2">
                                <select
                                    className="form-select"
                                    aria-label="Статус заказа"
                                    value={this.state.status}
                                    onChange={(e) => this.setState({status : e.target.value})}
                                    required
                                >
                                    <option value="PENDING">ОБРАБАТЫВАЕТСЯ</option>
                                    <option value="ASSEMBLED">СОБРАН</option>
                                    <option value="PAID">ОПЛАЧЕН</option>
                                    <option value="DELIVERED">ДОСТАВЛЯЕТСЯ</option>
                                    <option value="COMPLETED">ЗАВЕРШЕН</option>
                                </select>
                            </div>
                            <div className="col mb-2">
                                <button 
                                    className="btn btn-primary" 
                                    type="button"
                                    onClick={this.handleOrderStatus} 
                                >
                                    Изменить
                                </button>
                            </div>
                        </div>  
                        
                    );
                }
                else {
                    statusContent = (
                        <div className="mb-2"> статус: {status}</div>
                    );
                }
                orderContent = (
                <div className="container mt-3 p-3 rounded shadow">
                    <h2>Заказ № {this.state.order.id}</h2>
                    {statusContent}
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
                        <div className="fw-bold me-3">{totalPrice} ₽</div>
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