import React, { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import { useNavigate, useLocation } from 'react-router-dom';
//import Cookies from 'js-cookie';

const ProductUpdatePage = (props) => {
    //const [storeDTO, setStore] = useState([]);
    const location = useLocation();
    const {product} = location.state;
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);

    //const [imageUrl, setLogoUrl] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    //const [store, setStore] = useState([]);
    const [error, setError] = useState('');

    const handleProductAdd = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', parseInt(stock));
        if(image)formData.append('image', image);// && logo.split(',')[1]);
        try {
            const response = await axios.patch(`http://localhost:8080/api/v1/product/${product.id}`, formData,
                { 
                    headers: {'Content-Type': 'multipart/form-data'},
                    withCredentials: true 
                });

            navigate(-1);

        } catch (err) {
            if (err.response) {
                setError(`Ошибка: ${err.response.data.message || err.response.statusText}`);
            } else if (err.request) {
                setError('Ошибка: Сервер не ответил. Пожалуйста, попробуйте позже.');
            } else {
                setError(`Ошибка: ${err.message}`);
            }
        }

    };
    const onFileSelect = (event) => {
        if(event.target.files.length === 0){
            return;
        }
        const file = event.target.files[0];
        setImage(file);
        // let reader = new FileReader();
        // reader.onloadend = () => {
        //     setLogo(reader.result);
        // }
        // reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className="container">
                <h1 className="text-center">Изменение продукта({product.id})</h1>
                <form className="text-center" onSubmit={handleProductAdd}>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Название"
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                type="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Категория"
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                type="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Описание"
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                type="price"
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
                                type="stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Количество"
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <div className = "text-start mt-2">
                                <Input 
                                    type="file"
                                    onChange={onFileSelect} //{(e) => setLogo(e.target.value)}//{props.onFileSelect}
                                    //hasError=//{props.errors.image && true}
                                    error={error}
                                />
                            </div>
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
        </div>
        
    );
};

export default ProductUpdatePage;