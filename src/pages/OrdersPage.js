import React from 'react';
import { withRouterParam } from '../components/withRouterParam';
import { connect } from 'react-redux';
import OrderView from '../components/OrderView';
import * as apiCalls from '../api/apiCalls';
import Spinner from '../components/Spinner';

class OrdersPage extends React.Component{

    state = {
        //cart: this.props.loggedInUser.cart,
        role: this.props.loggedInUser.role,
        userId: this.props.loggedInUser.id,
        isLoadOrders: false,
        orders:[],
        error: undefined
    };
    componentDidMount(){
        this.loadOrders();
    }

    loadOrders = () => {
        this.setState({isLoadOrders: true});
        apiCalls.getOrders(this.state.userId)
        .then(response => {
            this.setState({
                orders: response.data,
                isLoadOrders: false
            });
        })
        .catch((error) => {
            this.setState({
                error
            })
        });

        
    }

    render() {
        let ordersContent;
        if(this.state.isLoadOrders){
            ordersContent = (
                <Spinner />
            );
        } 
        else{
            if(!this.state.orders){
                ordersContent = (
                    <div>
                        <h5>У вас нет заказов</h5>
                    </div>
                );
            }
            else ordersContent = (
                <div>
                    <h2>Мои заказы</h2>
                    <ol className="list-group list-group-numbered">
                        {this.state.orders.map((order) => {
                            return <OrderView key={order.id} order={order}/>;
                        })}
                    </ol>     
                </div>
            );
        } 
          
        return (
            <div data-testid="orderpage">

                {ordersContent}

                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
            </div>
        )
    }    
}

OrdersPage.defaultProps = {
    match: {
        params: {}
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
};

export default connect(mapStateToProps)(withRouterParam(OrdersPage));