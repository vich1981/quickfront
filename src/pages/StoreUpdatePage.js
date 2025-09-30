import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate, useLocation } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';

const StoreUpdatePage = () => {
    const loc = useLocation();
    const { store } = loc.state;
    const [name, setName] = useState(store.name);
    const [location, setLocation] = useState(store.location);
    const [description, setDescription] = useState(store.description);
    const [workingHours, setWorkingHours] = useState(store.workingHours);
    const [logo, setLogo] = useState('');
    const [logoPreview, setLogoPreview] = useState('');
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [error, setError] = useState('');
    const [locationLoading, setLocationLoading] = useState(false);
    const navigate = useNavigate();

    const MAX_NAME_LENGTH = 35;
    const MAX_DESCRIPTION_LENGTH = 255;

    const handleUpdateStore = (e) => {
        e.preventDefault();
        setPendingApiCall(true);
        const formData = new FormData();
        formData.append('storeName', name);
        formData.append('storeLocation', location);
        formData.append('storeDescription', description);
        formData.append('storeWorkingHours', workingHours);
        if (logo) formData.append('logo', logo);

        apiCalls.updateStore(store.id, formData)
            .then(response => {
                navigate(-1);
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
            })
            .finally(() => setPendingApiCall(false));
    };

    const onFileSelect = (event) => {
        if (event.target.files.length === 0) {
            return;
        }
        const file = event.target.files[0];
        setLogo(file);

        // для предпросмотра изображения
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onNameChange = (e) => {
        if (e.target.value.length <= MAX_NAME_LENGTH) {
            setName(e.target.value);
        }
    };

    const onDescriptionChange = (e) => {
        if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
            setDescription(e.target.value);
        }
    };

    // получения текущей локации
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('Геолокация не поддерживается вашим браузером.');
            return;
        }
        setLocationLoading(true);
        setError('');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.address) {
                            const { house_number, road, city } = data.address;
                            let address = '';
                            if (city) address += city + ", ";
                            if (road) address += road;
                            if (house_number) address += ', д.' + house_number;
                            setLocation(address || 'Адрес не найден');
                        } else {
                            setLocation('Адрес не найден');
                        }
                    })
                    .catch(() => {
                        setError('Ошибка при получении адреса.');
                    })
                    .finally(() => setLocationLoading(false));
            },
            (error) => {
                setLocationLoading(false);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setError('Доступ к геолокации запрещен. Разрешите доступ в настройках браузера.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setError('Информация о локации недоступна.');
                        break;
                    case error.TIMEOUT:
                        setError('Время ожидания получения локации истекло.');
                        break;
                    default:
                        setError('Неизвестная ошибка при получении локации.');
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
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
                <i className="fas fa-edit"></i> Обновить магазин
            </h1>
            <form onSubmit={handleUpdateStore} className="p-3">
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', color: '#495057' }}>
                        <i className="fas fa-tag"></i> Название магазина
                    </label>
                    <Input
                        type="text"
                        value={name}
                        onChange={onNameChange}
                        placeholder="Название магазина"
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
                        <i className="fas fa-map-marker-alt"></i> Расположение
                    </label>
                    <div className="input-group">
                        <Input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Расположение"
                            required
                            style={{
                                borderRadius: '8px 0 0 8px',
                                border: '1px solid #ced4da',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                            }}
                            onFocus={(e) => e.target.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)'}
                            onBlur={(e) => e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'}
                        />
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={getCurrentLocation}
                                disabled={locationLoading}
                                style={{
                                    borderRadius: '0 8px 8px 0',
                                    border: '1px solid #ced4da',
                                    transition: 'all 0.3s',
                                    background: locationLoading ? '#f8f9fa' : 'white'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(0, 123, 255, 0.1)'}
                                onMouseLeave={(e) => e.target.style.background = locationLoading ? '#f8f9fa' : 'white'}
                            >
                                {locationLoading ? (
                                    <i className="fas fa-spinner fa-spin"></i>
                                ) : (
                                    <i className="fas fa-globe"></i>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', color: '#495057' }}>
                        <i className="fas fa-align-left"></i> Описание
                    </label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={onDescriptionChange}
                        placeholder="Описание"
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
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', color: '#495057' }}>
                        <i className="fas fa-clock"></i> Время работы
                    </label>
                    <textarea
                        className="form-control"
                        value={workingHours}
                        onChange={(e) => setWorkingHours(e.target.value)}
                        placeholder="Время работы"
                        rows="2"
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
                </div>
                <div className="mb-3">
                    <label style={{ fontWeight: 'bold', color: '#495057' }}>
                        <i className="fas fa-image"></i> Логотип
                    </label>
                    <Input 
                        type="file"
                        onChange={onFileSelect}
                        accept="image/*"
                        style={{
                            borderRadius: '8px',
                            border: '1px solid #ced4da',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    {(logoPreview || store.logo) && (
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
                                src={logoPreview || store.logo} 
                                alt="Предпросмотр логотипа" 
                                style={{ 
                                    width: '150px', 
                                    height: '150px', 
                                    borderRadius: '10px',
                                    objectFit: 'cover'
                                }} 
                            />
                            <small className="text-muted">Превью логотипа</small>
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <ButtonWithProgress 
                        onClick={handleUpdateStore}
                        disabled={pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text="Обновить"
                        style={{
                            background: 'linear-gradient(135deg, #007bff 0%, #6610f2 100%)',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '10px 30px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
                            color: 'white'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
                        }}
                    />
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

export default StoreUpdatePage;
