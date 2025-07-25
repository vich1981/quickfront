import React, { useState } from 'react';
import Input from '../components/Input';
import { useNavigate,useLocation } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';
//import Cookies from 'js-cookie';

const StoreUpdatePage = () => {
    //const [storeDTO, setStore] = useState([]);
    const loc = useLocation();
    const {store} = loc.state;
    //const [userId, setUserId] = useState(store.userId);
    const [name, setName] = useState(store.name);
    const [location, setLocation] = useState(store.location);
    const [description, setDescription] = useState(store.description);
    const [workingHours, setWorkingHours] = useState(store.workingHours);
    const [logoUrl, setLogoUrl] = useState('');
    const [logo, setLogo] = useState('');
    const navigate = useNavigate();
    //const [store, setStore] = useState([]);
    const [error, setError] = useState('');

    const handleUpdateStore = (e) => {
        e.preventDefault();
        const formData = new FormData();
        //formData.append('userId', userId);
        formData.append('storeName', name);
        formData.append('storeLocation', location);
        formData.append('storeDescription', description);
        formData.append('storeWorkingHours', workingHours);
        if(logo)formData.append('logo', logo);
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

    /*const handleStoreRegister = async (e) => {
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

    };*/
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
                <h1 className="text-center">Изменение магазина</h1>
                <form className="text-center" onSubmit={handleUpdateStore}>

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
                            <button className="btn btn-primary mb-3" type="submit">Изменить</button>
                        </div>
                    </div> 
                </form>
                {error && <p className="alert alert-danger">{error}</p>}  
            </div>
        </div>
        
    );
};

export default StoreUpdatePage;