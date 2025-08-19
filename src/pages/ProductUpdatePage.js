import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';
import Input from '../components/Input';

const ProductUpdatePage = () => {
    const initialState = {
        product: {
            name: 'name',
            description: 'description',
            category: 'Еда',
            price: 100,
            stock: 100
        }
    };

    const location = useLocation();
    const { product } = location.state ?? initialState;
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [showCategories, setShowCategories] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const categories = ['Еда', 'Техника', 'Одежда', 'Книги', 'Косметика']; // категории
    const navigate = useNavigate();

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', parseInt(stock));
        if (image) formData.append('image', image);

        apiCalls.updateProduct(formData, product.id)
            .then(response => {
                navigate(-1);
            })
            .catch((error) => {
                if (error.response) {
                    setError(`Ошибка: ${error.response.data.message || error.response.statusText}`);
                } else if (error.request) {
                    setError('Ошибка: Сервер не ответил. Пожалуйста, попробуйте позже.');
                } else {
                    setError(`Ошибка: ${error.message}`);
                }
            });
    };

    const onFileSelect = (event) => {
        if (event.target.files.length === 0) {
            return;
        }
        const file = event.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleCategorySelect = (cat) => {
        setCategory(cat);
        setShowCategories(false);
    };

    return (
        <div className="container">
            <h1 className="text-center">Изменение продукта ({product.id})</h1>
            <form className="text-center" onSubmit={handleUpdateProduct}>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Название"
                            required
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <div className="position-relative">
                            <input
                                type="text"
                                value={category}
                                readOnly
                                onFocus={() => setShowCategories(true)}
                                placeholder="Категория"
                                required
                            />
                            {showCategories && (
                                <ul className="list-group position-absolute" style={{ zIndex: 1000 }}>
                                    {categories.map((cat, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => handleCategorySelect(cat)}
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Описание"
                            rows="4"
                            required
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Цена"
                            required
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="Количество"
                            required
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <div className="text-start mt-2">
                            <Input
                                type="file"
                                onChange={onFileSelect}
                                error={error}
                            />
                        </div>
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <button className="btn btn-primary mb-3" type="submit">Обновить</button>
                    </div>
                </div>
            </form>
            {error && <p className="alert alert-danger">{error}</p>}
        </div>
    );
};

export default ProductUpdatePage;