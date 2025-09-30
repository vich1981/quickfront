import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';
import Input from '../components/Input';

const ProductAddPage = (props) => {
    const location = useLocation();
    const { storeId } = location.state;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const categories = ['Еда', 'Техника', 'Одежда', 'Книги', 'Косметика', 'Аниме'];
    const navigate = useNavigate();

   // Ограничения на основе DTO
    const MAX_NAME_LENGTH = 45;
    const MAX_DESCRIPTION_LENGTH = 255;
    const MAX_CATEGORY_LENGTH = 45;

    const handleProductAdd = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', parseInt(stock));
        formData.append('image', image);

        apiCalls.addProduct(formData, storeId)
            .then(response => {
                navigate(`/store/${storeId}`);
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

    const onNameChange = (e) => {
        if (e.target.value.length <= MAX_NAME_LENGTH) {
            setName(e.target.value);
        }
    };

    const onCategoryChange = (e) => {
        if (e.target.value.length <= MAX_CATEGORY_LENGTH) {
            setCategory(e.target.value);
        }
    };

    const onDescriptionChange = (e) => {
        if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
            setDescription(e.target.value);
        }
    };

    return (
        <div 
            className="col-lg-6 offset-lg-3 mt-5"
            style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                animation: 'fadeIn 0.5s ease-in-out'
            }}
        >
            <h1 
                className="text-center mb-4"
                style={{
                    color: '#495057',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
                }}
            >
                <i className="fas fa-plus-circle"></i> Добавить продукт
            </h1>
            <form onSubmit={handleProductAdd} className="p-3">
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', color: '#495057' }}>
                        <i className="fas fa-tag"></i> Название
                    </label>
                    <Input
                        type="text"
                        value={name}
                        onChange={onNameChange}
                        placeholder="Название продукта"
                        required
                        style={{
                            borderRadius: '8px',
                            border: '1px solid #ced4da',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)'}
                        onBlur={(e) => e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'}
                    />
                    <small className="text-muted">{name.length} / {MAX_NAME_LENGTH}</small>
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', color: '#495057' }}>
                        <i className="fas fa-list"></i> Категория
                    </label>
                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={{
                            borderRadius: '8px',
                            border: '1px solid #ced4da',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
                            background: 'white'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)'}
                        onBlur={(e) => e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {}
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', color: '#495057' }}>
                        <i className="fas fa-align-left"></i> Описание
                    </label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={onDescriptionChange}
                        placeholder="Подробное описание продукта"
                        rows="4"
                        required
                        style={{
                            borderRadius: '8px',
                            border: '1px solid #ced4da',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
                            resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)'}
                        onBlur={(e) => e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'}
                    />
                    <small className="text-muted">{description.length} / {MAX_DESCRIPTION_LENGTH}</small>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label style={{ fontWeight: 'bold', color: '#495057' }}>
                            <i className="fas fa-ruble-sign"></i> Цена
                        </label>
                        <Input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0"
                            required
                            style={{
                                borderRadius: '8px',
                                border: '1px solid #ced4da',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}
                            onFocus={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)'}
                            onBlur={(e) => e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label style={{ fontWeight: 'bold', color: '#495057' }}>
                            <i className="fas fa-boxes"></i> Количество
                        </label>
                        <Input
                            type="text"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="0"
                            required
                            style={{
                                borderRadius: '8px',
                                border: '1px solid #ced4da',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}
                            onFocus={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)'}
                            onBlur={(e) => e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', color: '#495057' }}>
                        <i className="fas fa-image"></i> Изображение
                    </label>
                    <Input
                        type="file"
                        onChange={onFileSelect}
                        error={error}
                        style={{
                            borderRadius: '8px',
                            border: error ? '1px solid #dc3545' : '1px solid #ced4da',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    {imagePreview && (
                        <div 
                            className="mt-3 text-center"
                            style={{
                                border: '2px solid #dee2e6',
                                borderRadius: '10px',
                                padding: '10px',
                                background: 'white',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ 
                                    maxHeight: '200px', 
                                    borderRadius: '8px',
                                    objectFit: 'cover'
                                }}
                            />
                            <small className="text-muted">Превью изображения</small>
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <button 
                        className="btn btn-primary btn-lg"
                        type="submit"
                        style={{
                            background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '10px 30px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
                        }}
                    >
                        <i className="fas fa-save"></i> Добавить
                    </button>
                </div>
            </form>
            {error && (
                <div className="alert alert-danger mt-3" style={{ borderRadius: '8px' }}>
                    <i className="fas fa-exclamation-triangle"></i> {error}
                </div>
            )}
        </div>
    );
};

export default ProductAddPage;
