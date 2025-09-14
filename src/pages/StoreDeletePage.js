import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';

const StoreDeletePage = () => {
    const loc = useLocation();
    const { store } = loc.state;
    const [name, setName] = useState(store.name);
    const [location, setLocation] = useState(store.location);
    const [description, setDescription] = useState(store.description);
    const [workingHours, setWorkingHours] = useState(store.workingHours);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleDeleteStore = (e) => {
        e.preventDefault();
        apiCalls.deleteStore(store.id)
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
            });
    };

    return (
        <div className="col-lg-6 offset-lg-3 mt-5">
            <h1 className="text-center alert alert-danger mb-4">Вы действительно хотите удалить магазин ?</h1>
            <form onSubmit={handleDeleteStore} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <label>Название магазина: {name}</label>
                </div>
                <div className="mb-3">
                    <label>Расположение: {location}</label>
                </div>
                <div className="mb-3">
                    <label>Описание: {description}</label>
                </div>
                <div className="mb-3">
                    <label>Время работы: {workingHours}</label>
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

export default StoreDeletePage;