import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с куками

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email,
                password,
            }, { withCredentials: true });


            Cookies.set('sessionId', response.data.sessionId, { path: '/' });

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
                <h1 className="text-center">Login</h1>
                <form className="text-center" onSubmit={handleLogin}>
                    <div className="col-12 mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <p className="alert alert-danger">{error}</p>}  
            </div>
        </div>
    );
};

export default Login;
