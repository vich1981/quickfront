import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/store/all/store');
                setStores(response.data);
                setStores([{
                    storeId:"1", 
                    storeName:"Diksi",
                    storeLocation:"Lenina d.5",
                    storeDesctiption:"food store",
                    storeWorkingHours:"08:00 - 22:00",
                    storeRating:"4",
                    logoUrl:"https://static.tildacdn.com/tild3263-3162-4432-b763-373034643236/logo_green_02.svg"},
                {
                    storeId:"2", 
                    storeName:"Yarche",
                    storeLocation:"Pushkina d.37",
                    storeDesctiption:"food store",
                    storeWorkingHours:"09:00 - 22:00",
                    storeRating:"5",
                    logoUrl:"https://upload.wikimedia.org/wikipedia/commons/a/ae/Dixy_logo.svg"
                }]);
            } catch (err) {
                setError('Failed to fetch stores. Please try again later.');
                console.error(err);
            }
        };

        fetchStores();
    }, []);

    return (
        <div>
            <h2>Store List</h2>
            <div class="list-group">
            {stores.map((store) => (
               
                <a href="/store/{store.storeId}" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{store.storeName}</h5>
                    <p><img src={store.logoUrl} width="80" height="60" alt="" /></p>
                    <small>{store.storeWorkingHours}</small>
                    </div>
                    <p class="mb-1">{store.storeDesctiption}</p>
                    <small>{store.storeLocation}</small>
                </a>
            ))}
            </div>
            {error && <p>{error}</p>}
            {/* <ul>
                {stores.map((store) => (
                    <li key={store.id}>{store.name}</li> 
                ))}
            </ul> */}
        </div>
    );
};

export default StoreList;