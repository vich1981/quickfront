import React,{Component} from 'react';
import {connect} from 'react-redux';

class CartProductView extends Component {

    state = {

        product: this.props.product

    }
    
    onClickTrash = () => {
        const action = {
            type:'removeProduct',
            payload: this.state.product
        };
        this.props.dispatch(action);
    }

    onClickMinus = () => {
        const action = {
            type:'decrementProduct',
            payload: this.state.product
        };
        this.props.dispatch(action);
    }

    onClickPlus = () => {
        const action = {
            type:'incrementProduct',
            payload: this.state.product
        };
        this.props.dispatch(action);
    }



    render(){
        const { product } = this.props;
        return (
            <li key={product.id} class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">{product.name}</div>
                    {product.description}
                </div>
                <div className="align-self-center "> 
                    <button 
                        className="btn btn-outline-danger btn-sm shadow-none outline-none"
                        onClick={this.onClickTrash}
                    >
                        <i class="fas fa-trash"/>
                    </button>
                </div>
                <div className="align-self-center ms-2">
                    <button 
                        className="btn btn-outline-primary btn-sm shadow-none outline-none"
                        onClick={this.onClickMinus}
                    >
                        <i class="fas fa-minus"/>
                    </button>
                </div>
                <div className="align-self-center ms-2">{product.quantity}</div>
                <div className="align-self-center ms-2">
                    <button 
                        className="btn btn-outline-primary btn-sm shadow-none outline-none"
                        onClick={this.onClickPlus}
                    >
                        <i class="fas fa-plus"/>
                    </button>
                </div>
                <div className="col-1 align-self-center fw-bold ms-2 text-end">
                    {Number(product.price)*product.quantity} ₽
                </div>
            </li>
        );
    };   
}

const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps)(CartProductView);
