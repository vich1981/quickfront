import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';

const StoreRegister = () => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [workingHoursStartHour, setWorkingHoursStartHour] = useState('');
    const [workingHoursStartMinute, setWorkingHoursStartMinute] = useState('');
    const [workingHoursEndHour, setWorkingHoursEndHour] = useState('');
    const [workingHoursEndMinute, setWorkingHoursEndMinute] = useState('');
    const [logo, setLogo] = useState('');
    const [logoPreview, setLogoPreview] = useState('');
    const [pendingApiCall,setPendingApiCall] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegisterStore = (e) => {
        e.preventDefault();
        setPendingApiCall(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('workingHours', `С ${workingHoursStartHour}:${workingHoursStartMinute} ДО ${workingHoursEndHour}:${workingHoursEndMinute}`);
        formData.append('logo', logo);

        apiCalls.registerStore(formData)
            .then(response => {
                navigate(`/store/my/store`);
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
    

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Регистрация магазина</h1>
            <form onSubmit={handleRegisterStore} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Название магазина"
                        required
                    />
                </div>
                <div className="mb-3">
                    <Input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Расположение"
                        required
                    />
                </div>
                <div className="mb-3">
                    <Input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Описание"
                        required
                    />
                </div>
                <div className="mb-3 d-flex align-items-center justify-content-between">
                    <label className="me-2" style={{color: 'black'}}>Часы работы:</label>
                    <div className="d-flex align-items-center">
                        <span style={{color: 'black', padding: 5}}>C</span>
                        <Input
                            type="number"
                            value={workingHoursStartHour}
                            onChange={(e) => setWorkingHoursStartHour(e.target.value)}
                            placeholder="Часы"
                            required
                            className="me-2"
                            min="0"
                            max="23"
                        />
                        <span style={{color: 'black'}}>:</span>
                        <Input
                            type="number"
                            value={workingHoursStartMinute}
                            onChange={(e) => setWorkingHoursStartMinute(e.target.value)}
                            placeholder="Минуты"
                            required
                            className="ms-2"
                            min="0"
                            max="59"
                        />
                        <span style={{color: 'black', padding: 5}}>ДО</span>
                        <Input
                            type="number"
                            value={workingHoursEndHour}
                            onChange={(e) => setWorkingHoursEndHour(e.target.value)}
                            placeholder="Часы"
                            required
                            className="ms-2"
                            min="0"
                            max="23"
                        />
                        <span style={{color: 'black'}}>:</span>
                        <Input
                            type="number"
                            value={workingHoursEndMinute}
                            onChange={(e) => setWorkingHoursEndMinute(e.target.value)}
                            placeholder="Минуты"
                            required
                            className="ms-2"
                            min="0"
                            max="59"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <Input 
                        type="file"
                        onChange={onFileSelect}
                        accept="image/*"
                    />
                    {logoPreview && (
                        <div className="mt-2">
                            <img src={logoPreview} alt="Предпросмотр логотипа" style={{ width: '150px', height: '150px', borderRadius: '10px' }} />
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <ButtonWithProgress 
                        onClick={handleRegisterStore}
                        disabled={pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text="Зарегистрировать"
                    />
                </div>
            </form>
            {error && <p className="alert alert-danger mt-3">{error}</p>}
        </div>
    );
};

export default StoreRegister;
