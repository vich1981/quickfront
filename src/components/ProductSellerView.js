import React, { Component } from 'react';
import ProductImageWithDefault from './ProductImageWithDefault';
import { Link } from 'react-router-dom';
import "../css/ProductSellerView.css";

class ProductSellerView extends Component {
   
   render(){
       const { product } = this.props;
       return (
            <div 
                key={product.id}
                className="product-card"
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                <div className="product-image-container">
                    <Link to={`/product/${product.id}`}>
                        <ProductImageWithDefault
                            className="product-image"
                            src={`https://quick-cart.ru/api/product/productImage/${product.imageUrl}`}
                            alt={product.name}
                        />
                    </Link>
                </div> 
                <div className="product-info">
                    <h5 className="product-title">{product.name}</h5>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price-section">
                        <div className="product-price">
                            <i className="fas fa-tag"></i> {product.price} ₽
                        </div>
                        <div className="product-stock">
                            <i className="fas fa-box"></i> Осталось: {product.stock}
                        </div>
                    </div>
                </div>
                <Link 
                    to="/product/update"
                    state={{product: product}}
                    className="add-to-cart-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <i className="fas fa-edit"></i> Изменить  {}
                </Link>
            </div>
        );
   }
}

export default ProductSellerView;
