import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate, useLocation } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';

const StoreUpdatePage = () => {
    const loc = useLocation();
    const { store } = loc.state;
    const [name, setName] = useState(store.name);
    const [location, setLocation] = useState(store.location);
    const [description, setDescription] = useState(store.description);
    const [workingHours, setWorkingHours] = useState(store.workingHours);
    // const [workingHoursStartHour, setWorkingHoursStartHour] = useState(store.workingHours.split(' ')[1].split(':')[0]);
    // const [workingHoursStartMinute, setWorkingHoursStartMinute] = useState(store.workingHours.split(' ')[1].split(':')[1]);
    // const [workingHoursEndHour, setWorkingHoursEndHour] = useState(store.workingHours.split(' ')[3].split(':')[0]);
    // const [workingHoursEndMinute, setWorkingHoursEndMinute] = useState(store.workingHours.split(' ')[3].split(':')[1]);
    const [logo, setLogo] = useState('');
    const [logoPreview, setLogoPreview] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleUpdateStore = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('storeName', name);
        formData.append('storeLocation', location);
        formData.append('storeDescription', description);
        formData.append('storeWorkingHours', workingHours);//`С ${workingHoursStartHour}:${workingHoursStartMinute} ДО ${workingHoursEndHour}:${workingHoursEndMinute}`);
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
            });
    };

    const onFileSelect = (event) => {
        if (event.target.files.length === 0) {
            return;
        }
        const file = event.target.files[0];
        setLogo(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="col-6 offset-3 mt-5">
            <h1 className="text-center mb-4">Обновить магазин</h1>
            <form onSubmit={handleUpdateStore} className="bg-light p-4 rounded shadow">
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
                <div className="mb-3">
                    <textarea className="form-control"
                        type="text"
                        value={workingHours}
                        onChange={(e) => setWorkingHours(e.target.value)}
                        placeholder="Время работы"
                        required
                    />
                </div>
                {/* <div className="mb-3 d-flex align-items-center justify-content-between">
                    <label className="me-2" style={{ color: 'black' }}>Часы работы:</label>
                    <div className="d-flex align-items-center">
                        <span style={{ color: 'black', padding: 5 }}>C</span>
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
                        <span style={{ color: 'black' }}>:</span>
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
                        <span style={{ color: 'black', padding: 5}}>ДО</span>
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
                </div> */}
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
                    <button className="btn btn-primary" type="submit">Обновить</button>
                </div>
            </form>
            {error && <p className="alert alert-danger mt-3">{error}</p>}
        </div>
    );
};

export default StoreUpdatePage;