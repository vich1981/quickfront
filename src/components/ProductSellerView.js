import React, { Component } from 'react';
import ProductImageWithDefault from './ProductImageWithDefault';
//  import { format } from 'timeago.js';
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
                    <div className="row">
                        <h5 className="card-title">{product.name}</h5>
                    </div>
                    <div className="row">    
                        <p className="card-text">{product.description}</p>
                    </div>
                    <div className="row">
                        <div className="align-self-end">
                            <div className="fw-bold">
                                Цена: {product.price} ₽
                            </div>
                            <small className="text-body-secondary">Осталось:{product.stock}</small> 
                        </div>
                        
                    </div>
                
                </div>
                <Link 
                    to="/product/update"
                    state={{product: product}}
                    className="btn btn-primary"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    Изменить
                </Link>
            </div>
        );
   }
}

export default ProductSellerView; 