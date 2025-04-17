import React, { useState } from 'react';
import * as apiCalls from '../api/apiCalls';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с куками
import { useDispatch } from 'react-redux';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = 
            // apiCalls.login(email,password);
            await axios.post('http://localhost:8080/api/v1/auth/login', {
                email,
                password
            }, { withCredentials: true });

            const user = await axios.get(`http://localhost:8080/api/v1/users/email/${email}`, {
                withCredentials: true });

            const loggedIn = {
                id: user.data.id,
                username: user.data.username,
                email: user.data.email,
                location: user.data.location,
                image: '',
                password: '',
                isLoggedIn: true
            };
            const action = {
                type: 'login-success',
                payload:loggedIn
            };
            dispatch(action);

            Cookies.set('sessionId', response.data.sessionId, { path: '/' });

            console.log(response.data);
            navigate('/store/all/store');
        } catch (error) {
            setError('Не удается войти, неверный email или пароль');
            console.error(error);
        }
    };

    return (
        <div>
            <div className="container">
                <h1 className="text-center">Login</h1>
                <form className="text-center" onSubmit={handleLogin}>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                className="input-group"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <input
                                className="input-group"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <button className="btn btn-primary mb-3" type="submit">Login</button>
                        </div>
                    </div> 
                </form>
                {error && <p className="alert alert-danger">{error}</p>}  
            </div>
        </div>
    );
};

export default LoginPage;
