import React,{Component} from 'react';

class OrderProductView extends Component {

    state = {

        product: this.props.product

    }


    render(){
        const { product } = this.props;
        return (
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{product.name}</div>
                    {product.description}
                </div>
                
                <div className="col-3 align-self-center fw-bold ms-2 text-end">
                    {product.quantity} шт. х {Number(product.price)} ₽ = {product.quantity*Number(product.price)} ₽
                </div>
            </li>
        );
    };   
}



export default OrderProductView;
