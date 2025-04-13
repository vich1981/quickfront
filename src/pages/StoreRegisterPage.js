import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import Cookies from 'js-cookie';

const StoreRegister = () => {
    //const [storeDTO, setStore] = useState([]);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [workingHours, setWorkingHours] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const navigate = useNavigate();
    //const [store, setStore] = useState([]);
    const [error, setError] = useState('');

    const handleStoreRegister = async (e) => {
        e.preventDefault();
        // setStore({
        //     userId: 1,
        //     name: "Marusia",
        //     location: "Russia",
        //     description: "grocery",
        //     workingHours: "круглосуточно",
        //     logoUrl: "string"
        // });
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('workingHours', workingHours);
        formData.append('logoUrl', logoUrl);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/store/register', formData,
                { 
                    headers: {'Content-Type': 'multipart/form-data'},
                    withCredentials: true 
                });


        //     //Cookies.set('sessionId', response.data.sessionId, { path: '/' });

        //     console.log(response.data);
        //     navigate('/store/all/store');
        // } catch (error) {
        //     setError('Failed to log in. Please check your credentials.');
        //     console.error(error);
        // }

        // setLoading(true);

        // if (!store.name && !store.description && !store.location && !store.logo) {
        //     setError('Пожалуйста, заполните хотя бы одно поле для обновления.');
        //     setLoading(false);
        //     return;
        // }

        // const formData = new FormData();
        // if (store.name) formData.append('name', store.name);
        // if (store.description) formData.append('description', store.description);
        // if (store.location) formData.append('location', store.location);
        // if (store.logo) formData.append('logo', store.logo);

        // try {
        //     const response = await axios.patch(`http://localhost:8080/api/v1/store/update/${id}`, formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //         withCredentials: true,
        //     });


        //     if (response.data.sessionId) {
        //         Cookies.set('sessionId', response.data.sessionId, { path: '/' });
        //     }

        navigate(`/users/${userId}`);

        } catch (err) {
            if (err.response) {
                setError(`Ошибка: ${err.response.data.message || err.response.statusText}`);
            } else if (err.request) {
                setError('Ошибка: Сервер не ответил. Пожалуйста, попробуйте позже.');
            } else {
                setError(`Ошибка: ${err.message}`);
            }
        } finally {
//            setLoading(false);
        }

    };

    return (
        <div>
            <div className="container">
                <h1 className="text-center">Store register</h1>
                <form className="text-center" onSubmit={handleStoreRegister}>
                    <div className="col-12 mb-3">
                        <input
                            type="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="User Id"
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <input
                            type="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location"
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <input
                            type="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <input
                            type="working hours"
                            value={workingHours}
                            onChange={(e) => setWorkingHours(e.target.value)}
                            placeholder="Working hours"
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <input
                            type="logo URL"
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                            placeholder="Logo URL"
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                {error && <p className="alert alert-danger">{error}</p>}  
            </div>
        </div>
        
    );
};

export default StoreRegister;
