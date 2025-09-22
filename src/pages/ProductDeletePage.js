import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';

const ProductDeletePage = () => {
    const loc = useLocation();
    const { product } = loc.state;
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleDeleteProduct = (e) => {
        e.preventDefault();
        apiCalls.deleteProduct(product.id)
            .then(response => {
                navigate(-2);
                console.log(response.data);
            })
            .catch(error => {
                if (error.response) {
                    setError(`Ошибка: ${error.response.data.message || error.response.statusText}`);
                } else if (error.request) {
                    setError('Ошибка: Сервер не ответил. Пожалуйста, попробуйте позже.');
                } else {
                    setError(`Ошибка: ${error.message}`);
                }
            });
    };

    return (
        <div className="col-lg-6 offset-lg-3 mt-5">
            <h1 className="text-center alert alert-danger mb-4">Вы действительно хотите удалить продукт?</h1>
            <form onSubmit={handleDeleteProduct} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <label>Название продукта: {name}</label>
                </div>
                <div className="mb-3">
                    <label>Категория: {category}</label>
                </div>
                <div className="mb-3">
                    <label>Описание: {description}</label>
                </div>
                <div className="mb-3">
                    <label>В наличии: {stock}</label>
                </div>
                <div className="mb-3">
                    <label>Цена: {price} ₽</label>
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button className="btn btn-danger" type="submit">Удалить</button>
                    <button 
                        className="btn btn-primary"  
                        onClick={() => navigate(-1)}
                        type="button"
                    >
                        Отменить
                    </button>
                </div>
            </form>
            {error && <p className="alert alert-danger mt-3">{error}</p>}
        </div>
    );
};

export default ProductDeletePage;