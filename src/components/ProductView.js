import React, { Component } from 'react';
import ProductImageWithDefault from './ProductImageWithDefault';
//  import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductView extends Component {
    state = {
        product: this.props.product,
        //products: this.props.products
    }

    addProduct = () => {
        const action = {
            type:'addNewProduct',
            payload: this.state.product
        };
        this.props.dispatch(action);
    };
   
   render(){
       const { product } = this.props;
       return (
            <div className="card col-lg-4 col-sm-6">
                <div className="text-center">
                    <Link to ={`/product/${product.id}`} >
                        <ProductImageWithDefault
                            className="img-fluid rounded-start text-center" 
                            src={`http://localhost:8080/api/v1/product/productImage/${product.imageUrl}`} 
                            width="200" 
                            height="200" 
                            alt="" 
                        />
                    </Link>
                </div> 
                <div className="card-body text-self-left">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="row">
                        <div className="col-6 align-self-end">
                            <div className="fw-bold">
                                    {product.price}
                            </div>
                            <small class="text-body-secondary">Осталось:{product.stock}</small> 
                        </div>
                        <div className="col-6 align-self-center">
                            <button className="btn btn-primary" onClick={this.addProduct}>В корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        );
   }
}

const mapStateToProps = (state) => {
    return {
        products: state.cart
    }
};
//
export default connect(mapStateToProps)(ProductView);       
   