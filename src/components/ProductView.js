import React from 'react';
import ProductImageWithDefault from './ProductImageWithDefault';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import "../css/ProductView.css";

const ProductView = ({ product, loggedInUserRole, dispatch }) => {
    const addProduct = () => {
        const action = {
            type: 'addNewProduct',
            payload: product
        };
        dispatch(action);
    };

    const isSold = product.stock === 0;

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
                    <div className={`product-stock ${isSold ? 'sold-out' : ''}`}>
                        <i className={`fas ${isSold ? 'fa-ban' : 'fa-box'}`}></i>
                        {isSold ? "Распродано" : `Осталось: ${product.stock}`}
                    </div>
                </div>
            </div>
            <button
                className={`add-to-cart-btn ${isSold ? 'disabled' : ''}`}
                disabled={loggedInUserRole !== 'BUYER' || isSold}
                onClick={(e) => {
                    e.stopPropagation();
                    addProduct();
                }}
            >
                {isSold ? (
                    <><i className="fas fa-times"></i> Нет в наличии</>
                ) : (
                    <><i className="fas fa-shopping-cart"></i> В корзину</>
                )}
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    loggedInUserRole: state.role,
    products: state.cart
});

export default connect(mapStateToProps)(ProductView);
