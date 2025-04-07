import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const StoreRegister = () => {
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
        try {
            const response = await axios.post('http://localhost:8080/api/v1/store/register', {
                userId,
                name,
                location,
                description,
                workingHours,
                logoUrl
            }, { withCredentials: true });


            //Cookies.set('sessionId', response.data.sessionId, { path: '/' });

            console.log(response.data);
            navigate('/store/all/store');
        } catch (error) {
            setError('Failed to log in. Please check your credentials.');
            console.error(error);
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
