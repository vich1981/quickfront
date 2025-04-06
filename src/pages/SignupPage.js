import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/signup', {
                username,
                email,
                password,
                location
            });
            console.log('Signup successful:', response.data);

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
                    <div className="col-12 mb-3">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <button type="submit">Signup</button>
                    </div>
                </form>
                {error && <p className="alert alert-danger">{error}</p>}
            </div>
        </div>
    );
};

export default SignupPage;
