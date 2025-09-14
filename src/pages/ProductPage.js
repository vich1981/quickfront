import React from 'react';
import Spinner from '../components/Spinner';
import ProductImageWithDefault from '../components/ProductImageWithDefault';
import { withRouter } from '../components/withRouter';
import * as apiCalls from '../api/apiCalls';
import { connect } from 'react-redux';


class ProductPage extends React.Component{
    state = {
        product: undefined,
        isLoadingProduct: false,
        error: undefined
    };

    componentDidMount(){
        this.loadProduct();
    }

    loadProduct = () => {
        const productId = this.props.match.params.id;
        if(!productId){
            return;
        }
        this.setState({isLoadingProduct: true});
        apiCalls.getProduct(productId)
        .then(response =>{
            this.setState({ product:response.data, isLoadingProduct: false});
        })
        .catch(error => {
            console.error(error);
            this.setState({
                isLoadingProduct: false,
                error: 'Невозможно получить продукт.'
            });
        });
    }

    render() {
        let productContent;
        if(this.state.isLoadingProduct){
            productContent = (
                <Spinner />
            );
        }
        else {
            if(this.state.product){
                // if(this.props.loggedInUserRole === 'SELLER'){
                //     productContent = (
                //         <div>
                //             <h2>Продукт</h2>
                //             <div className="row">
                //                 <div className="col">
                //                     <ProductImageWithDefault
                //                         className="img-fluid rounded-start text-center" 
                //                         src={`http://localhost:8080/api/v1/product/productImage/${this.state.product.imageUrl}`} 
                //                         width="400" 
                //                         height="400" 
                //                         alt=""
                //                     />
                //                 </div>
                //                 <div className="col">
                //                     <h5 className="card-title">{this.state.product.name}</h5>
                //                     <p className="card-text">{this.state.product.description}</p>
                //                     <div className="row">
                //                         <div className="col-6 align-self-end">
                //                             <div className="fw-bold">
                //                                     {this.state.product.price}
                //                             </div>
                //                             <small class="text-body-secondary">Осталось:{this.state.product.stock}</small> 
                //                         </div>
                //                         {/* <div className="col-6 align-self-center">
                //                             <Link 
                //                                 to="/product/update"
                //                                 state={{product: this.state.product}}
                //                                 className="btn btn-primary"
                //                             >
                //                                 Изменить
                //                             </Link>
                //                         </div> */}
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     )
                // }
                // else{
                productContent = (

                    <div className="container rounded shadow mt-3 p-3">
                        <h2>Продукт</h2>
                        <div className="row">
                            <div className="col-auto">
                                <ProductImageWithDefault
                                    className="img-fluid rounded text-center" 
                                    src={`http://localhost:8080/api/v1/product/productImage/${this.state.product.imageUrl}`} 
                                    width="400" 
                                    height="400" 
                                    alt=""
                                />
                            </div>
                            <div className="col">
                                <div className="row">
                                    <h5 className="card-title">{this.state.product.name}</h5>
                                </div>
                                <div className="row">
                                    <p className="card-text">{this.state.product.description}</p>
                                </div>
                                
                                
                                <div className="row align-items-end">
                                    <div className="col-auto align-self-end">
                                        <div className="fw-bold">
                                                Цена: {this.state.product.price} ₽
                                        </div>
                                        <small class="text-body-secondary">Осталось:{this.state.product.stock}</small> 
                                    </div>
                                    <div className="col-6 align-self-center">
                                        <button 
                                            onClick={() => this.props.navigate(-1)}
                                            className="btn btn-primary"
                                        >
                                            Вернуться
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                //}
            } 
            else productContent = (
                <div>
                    <h2>Невозможно отобразить продукт</h2>
                    <div className="col-6 align-self-center">
                        <button 
                            onClick={() => this.props.navigate(-1)}
                            className="btn btn-primary"
                        >
                            Вернуться
                        </button>
                    </div>
                </div>
                
            )
        }
        return (
            <div data-testid="productpage">

                {productContent}

                {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}
            </div>
        )
    }    
}

ProductPage.defaultProps = {
    match: {
        params: {}
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUserId: state.id,
        loggedInUserRole: state.role
    }
}

export default connect(mapStateToProps)(withRouter(ProductPage));