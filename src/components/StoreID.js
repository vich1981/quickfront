import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StoreID = () => {
    const { id } = useParams();
    const [store, setStore] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/store/${id}`, { withCredentials: true });
                setStore(response.data);
            } catch (err) {
                setError('Failed to fetch store. Please try again later.');
                console.error(err.response ? err.response.data : err.message);
            }
        };

        fetchStore();
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!store) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{store.storeName}</h2>
            <p>Rating: {store.storeRating}</p>
            <p>Location: {store.storeLocation}</p>
            <p>Description: {store.storeDescription}</p>
            <p>WorkTime: {store.storeWorkingHours}</p>
            <p>Owner: {store.userDtoInfo ? store.userDtoInfo.username : 'N/A'}</p>
        </div>
    );
};

export default StoreID;