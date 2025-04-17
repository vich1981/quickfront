import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/signup', {
                username,
                email,
                password,
                location,
                role
            });
            console.log('Signup successful:', response.data);
            navigate('/login');

        } catch (err) {
            setError(err.response?.data || 'Signup failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <div className="container">
                <h1 className="text-center">Sign up</h1>
                <form className="text-center" onSubmit={handleSignup}>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <input
                            className="input-group"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
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
                            autoComplete="current-password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <input
                            className="input-group"
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                </div>  
                <div className="row justify-content-center">
                    <div className="col-lg-3 mb-3">
                        <select
                            className="form-select"
                            aria-label="Выберите права пользователя"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required

                        >
                            <option value="ADMIN">Administrator</option>
                            <option value="MODER">Moderator</option>
                            <option value="BUYER">Buyer</option>
                            <option value="SELLER">Seller</option>
                        </select>
                    </div>
                </div>                
                <div className="row justify-content-center">
                    <div className="col-lg-4 mb-3">
                        <button className="btn btn-primary mb-3" type="submit">Signup</button>
                    </div>
                </div>  
                </form>
                {error && <p className="alert alert-danger">{error}</p>}
            </div>
        </div>
    );
};

export default SignupPage;
