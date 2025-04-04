import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Attempting to remove sessionId cookie...');
        Cookies.remove('sessionId', { path: '/' });

        // Проверяем, была ли кука удалена
        const cookieExists = Cookies.get('sessionId');
        if (!cookieExists) {
            console.log('sessionId cookie successfully removed.');
        } else {
            console.log('Failed to remove sessionId cookie.');
        }


        navigate('/');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;
