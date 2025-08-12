import React, { Component } from 'react';
import ProductImageWithDefault from './ProductImageWithDefault';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import "../css/ProductCard.css";

class ProductCard extends Component {
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
        // <div
        //             key={product.id}
        //             className="product-card"
                    
        //             onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        //             onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        //           >
        //             <div
        //               //onClick={() => navigate(`/product/${product.id}`)}
        //               style={{ cursor: 'pointer' }}
        //             >
        //               {product.imageUrl ? (
        //                 <img
        //                   src={`http://localhost:8080/api/v1/product/productImage/${product.imageUrl}`}
        //                   alt={product.name}
        //                   style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px'}}
        //                 />
        //               ) : (
        //                 <div style={{
        //                   width: '100%',
        //                   height: '150px',
        //                   backgroundColor: '#eee',
        //                   borderRadius: '4px',
        //                   display: 'flex',
        //                   justifyContent: 'center',
        //                   alignItems: 'center',
        //                   color: '#aaa'
        //                 }}>Нет изображения</div>
        //               )}
        //               <h3 style={{marginTop: '12px'}}>{product.name}</h3>
        //               <p>{product.description || 'Описание отсутствует'}</p>
        //               <p>Кол-во {product.stock}</p><p>Цена: {product.price} ₽</p>
        
        //             </div>
        //             <button
        //               className="btn btn-primary"
        //               onClick={(e) => {
        //                 e.stopPropagation();
        //                 this.addProduct(product);
        //               }}
        //             >
        //               В корзину
        //             </button>
        //           </div>
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
                <div
              
            >
              
              {/* <h3 style={{marginTop: '12px'}}>{product.name}</h3>
              <p>{product.description || 'Описание отсутствует'}</p>
              <p>Кол-во {product.stock}</p><p>Цена: {product.price} ₽</p> */}
                
                    <h4 className="card-title">{product.name}</h4>
                    <p className="card-text">{product.description}</p>
                    <div className="row">
                        <div className="col-6 align-self-end">
                            <div className="fw-bold">
                                    {product.price}
                            </div>
                            <small class="text-body-secondary">Осталось:{product.stock}</small> 
                        </div>
                        
                    </div>
                
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                this.addProduct();
              }}
            >
              В корзину
            </button>
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
export default connect(mapStateToProps)(ProductCard);       




// <div
//             key={product.id}
//             className="product-card"
            
//             onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
//             onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
//           >
//             <div
//               onClick={() => navigate(`/product/${product.id}`)}
//               style={{ cursor: 'pointer' }}
//             >
//               {product.imageUrl ? (
//                 <img
//                   src={`http://localhost:8080/api/v1/product/productImage/${product.imageUrl}`}
//                   alt={product.name}
//                   style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px'}}
//                 />
//               ) : (
//                 <div style={{
//                   width: '100%',
//                   height: '150px',
//                   backgroundColor: '#eee',
//                   borderRadius: '4px',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   color: '#aaa'
//                 }}>Нет изображения</div>
//               )}
//               <h3 style={{marginTop: '12px'}}>{product.name}</h3>
//               <p>{product.description || 'Описание отсутствует'}</p>
//               <p>Кол-во {product.stock}</p><p>Цена: {product.price} ₽</p>

//             </div>
//             <button
//               className="btn btn-primary"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 addProduct(product);
//               }}
//             >
//               В корзину
//             </button>
//           </div>