import React, { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';
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
    const [logo, setLogo] = useState('');
    const navigate = useNavigate();
    //const [store, setStore] = useState([]);
    const [error, setError] = useState('');

    const handleStoreRegister = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('workingHours', workingHours);
        formData.append('logo', logo);// && logo.split(',')[1]);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/store/register', formData,
                { 
                    headers: {'Content-Type': 'multipart/form-data'},
                    withCredentials: true 
                });

            navigate(`/users/${userId}`);

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
        setLogo(file);
        // let reader = new FileReader();
        // reader.onloadend = () => {
        //     setLogo(reader.result);
        // }
        // reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className="container">
                <h1 className="text-center">Store register</h1>
                <form className="text-center" onSubmit={handleStoreRegister}>

                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                type="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="User Id"
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                type="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
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
                                placeholder="Description"
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                type="working hours"
                                value={workingHours}
                                onChange={(e) => setWorkingHours(e.target.value)}
                                placeholder="Working hours"
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
                            <button className="btn btn-primary mb-3" type="submit">Register</button>
                        </div>
                    </div> 
                </form>
                {error && <p className="alert alert-danger">{error}</p>}  
            </div>
        </div>
        
    );
};

export default StoreRegister;
