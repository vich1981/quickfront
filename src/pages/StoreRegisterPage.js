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
            <h2>Store register</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleStoreRegister}>
                <input
                    type="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User Id"
                    required
                />
                <input
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    required
                />
                <input
                    type="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <input
                    type="working hours"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    placeholder="Working hours"
                    required
                />
                <input
                    type="logo URL"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="Logo URL"
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default StoreRegister;
