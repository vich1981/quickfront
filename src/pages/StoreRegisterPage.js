import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';
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

    const handleRegisterStore = () => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('workingHours', workingHours);
        formData.append('logo', logo);
        apiCalls.registerStore(formData)
        .then(response => {
            navigate(`/users/${userId}`);
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
                <h1 className="text-center">Регистрация магазина</h1>
                <form className="text-center" onSubmit={handleRegisterStore}>

                    <div className="row justify-content-center">
                        
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <Input
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Название магазина"
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <Input
                                type="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Расположение"
                                required
                            />
                        </div>    
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <Input
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
                            <Input
                                type="working hours"
                                value={workingHours}
                                onChange={(e) => setWorkingHours(e.target.value)}
                                placeholder="График работы"
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
                            <button className="btn btn-primary mb-3" type="submit">Зарегистрировать</button>
                        </div>
                    </div> 
                </form>
                {error && <p className="alert alert-danger">{error}</p>}  
            </div>
        </div>
        
    );
};

export default StoreRegister;
