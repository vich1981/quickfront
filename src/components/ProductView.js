import React, { Component } from 'react';
import ProductImageWithDefault from './ProductImageWithDefault';
//  import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import "../css/ProductView.css";

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
       const isSold = product.stock == 0? true : false;
       return (
            <div 
                key={product.id}
                className="product-card"
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                <div className="text-center">
                    <Link to ={`/product/${product.id}`} >
                        <ProductImageWithDefault
                            className="img-fluid rounded-start text-center" 
                            src={`http://localhost:8080/api/v1/product/productImage/${product.imageUrl}`} 
                            style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px'}}
                            alt="" 
                        />
                    </Link>
                </div> 
                <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="row">
                        <div className="align-self-end">
                            <div className="fw-bold">
                                Цена: {product.price} ₽
                            </div>
                            <small className="text-body-secondary">Осталось: {isSold ? "Распродано": product.stock}</small> 
                        </div>
                        
                    </div>
                
                </div>
                <button
                    className="btn btn-primary"
                    disabled={this.props.loggedInUserRole !== 'BUYER'|| isSold}
                    onClick={(e) => {
                        e.stopPropagation();
                        this.addProduct();
                    }}
                >
                    {isSold? 'Нет в наличии' : 'В корзину'}
                </button>
            </div>
        );
   }
}

const mapStateToProps = (state) => {
    return {
        loggedInUserRole: state.role,
        products: state.cart
    }
};
//
export default connect(mapStateToProps)(ProductView);       
   