import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoreView from '../components/StoreView';

const AllStorePage = () => {
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/store/all/store');
                setStores(response.data);
                // setStores([{
                //     id:"1", 
                //     name:"Diksi",
                //     location:"Lenina d.5",
                //     desctiption:"food store",
                //     workingHours:"08:00 - 22:00",
                //     rating:"4",
                //     logoUrl:"https://static.tildacdn.com/tild3263-3162-4432-b763-373034643236/logo_green_02.svg"},
                // {
                //     id:"2", 
                //     name:"Yarche",
                //     location:"Pushkina d.37",
                //     desctiption:"food store",
                //     workingHours:"09:00 - 22:00",
                //     rating:"5",
                //     logoUrl:"https://upload.wikimedia.org/wikipedia/commons/a/ae/Dixy_logo.svg"
                // }]);
            } catch (err) {
                setError('Невозможно получить список магазинов. Попробуйте попозже.');
                console.error(err);
            }
        };

        fetchStores();
    }, []);

    return (
        <div>
            <h2>Список магазинов</h2>
            <div className="list-group">
                {stores.map((store) => {
                    return <StoreView key={store.storeId} store = {store} />;
                })}
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

export default AllStorePage;