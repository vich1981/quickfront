import React, { useState } from 'react';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { withRouter } from '../components/withRouter';
import * as apiCalls from '../api/apiCalls';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/Input';

export class SignupPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        location: '',
        role: 'BUYER',
        pendingApiCall: false,
        apiError: undefined,
        errors: {},
        passwordRepeatConfirmed: true
    };
    
    onClickSignup = () => {
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            location: this.state.location,
            role: this.state.role
        };
        this.setState({pendingApiCall: true});
        apiCalls.signup(user)
        .then(response => {
            console.log('Signup successful:', response.data);
            this.setState({ pendingApiCall: false});
            this.login();
        })
        .catch(apiError => {
            let errors = {...this.state.errors }
            if(apiError.response.data && apiError.response.data.violations){
                errors = {...apiError.response.data.violations}
            }
            this.setState({ pendingApiCall: false, errors });

        })
    }
    // login = () => {
    //     this.setState({pendingApiCall: true});
    //     apiCalls.login(this.state.email, this.state.password)
    //     .then(response => {
    //         // this.setState({ isLogining: false});
    //         this.storeUser();
    //     })
    //     .catch((error) => {
    //         this.setState({
    //             pendingApiCall: false,
    //             apiError: 'Не удалось войти, попробуйте ещё раз'
    //         })
    //     });     
    // }
    login = () => {
        this.setState({pendingApiCall: true});
        apiCalls.login(this.state.email, this.state.password)
        .then(response => {
            // this.setState({ isLogining: false});
            this.setState({ pendingApiCall: false},() => {
                const loggedIn = {
                    id: response.data.id,
                    sessionId: response.data.sessionId,
                    username: response.data.username,
                    email: response.data.email,
                    location: response.data.location,
                    role: response.data.role,
                    image: '',
                    password: '',
                    isLoggedIn: true
                };
                const action = {
                    type: 'login-success',
                    payload:loggedIn
                };
                this.props.dispatch(action);
                Cookies.set('sessionId', response.data.sessionId, { path: '/' });

                console.log(response.data);
                this.props.navigate('/store/all/store');
            })

            //this.storeUser();
        })
        .catch((error) => {
            this.setState({
                pendingApiCall: false,
                apiError: 'Не удается войти, неверный email или пароль'
            })
        });     
    }

    // storeUser = () => {
    //     apiCalls.getUserByEmail(this.state.email)
    //     .then(response => {
    //         this.setState({ pendingApiCall: false },() => {
    //             const loggedIn = {
    //                 id: response.data.id,
    //                 sessionId: response.data.sessionId,
    //                 username: response.data.username,
    //                 email: response.data.email,
    //                 location: response.data.location,
    //                 role: response.data.role,
    //                 image: '',
    //                 password: '',
    //                 isLoggedIn: true
    //             };
    //             const action = {
    //                 type: 'login-success',
    //                 payload:loggedIn
    //             };
    //             this.props.dispatch(action);
    //             Cookies.set('sessionId', response.data.sessionId, { path: '/' });

    //             console.log(response.data);
    //             this.props.navigate(`/users/${loggedIn.id}`);
    //         })       
    //     })
    //     .catch((error) => {
    //         this.setState({
    //             pendingApiCall: false,
    //             apiError: 'Не удалось получить пользователя, попробуйте войти ещё раз'
    //         })
    //     });
    // }

    onChangePassword = (event) => {
        const value = event.target.value;
        const passwordConfirmed = this.state.passwordRepeat === value;
        const errors = { ...this.state.errors };
        delete errors.password;
        errors.passwordRepeat = passwordConfirmed ? '' : 'Пароли не совпадают';
        this.setState({ password: value, passwordRepeatConfirmed: passwordConfirmed, errors});
    };

    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.password === value;
        const errors = { ...this.state.errors };
        errors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Пароли не совпадают';
        this.setState({ passwordRepeat: value, passwordRepeatConfirmed: passwordRepeatConfirmed, errors});
    };

    onChangeUsername = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors }
        delete errors.username;
        this.setState({ username: value, errors });
    };

    render() { 
        return (
            <div>
                <div className="container">
                    <h1 className="text-center">Sign up</h1>
                    <form className="text-center" onSubmit={this.onClickSignup}>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <Input
                                className="form-control"
                                type="email"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <Input
                                className="form-control"
                                autoComplete="current-password"
                                type="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <Input
                                className="form-control"
                                //autoComplete="current-password"
                                type="password"
                                placeholder="Repeat password"
                                value={this.state.passwordRepeat}
                                onChange={this.onChangePasswordRepeat}
                                hasError={this.state.errors.passwordRepeat && true}
                                error={this.state.errors.passwordRepeat}
                                required
                            />
                        </div>
                    </div>
                    {/* <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Location"
                                value={this.state.location}
                                onChange={(e) => this.setState({ location: e.target.value })}
                                required
                            />
                        </div>
                    </div> */} 
                    <div className="row justify-content-center">
                        <div className="col-lg-3 mb-3">
                            <select
                                className="form-select"
                                aria-label="Выберите права пользователя"
                                value={this.state.role}
                                onChange={(e) => this.setState({ role: e.target.value })}
                                required
    
                            >
                                <option value="BUYER">Buyer</option>
                                <option value="SELLER">Seller</option>
                                {/* <option value="MODER">Moderator</option>
                                <option value="ADMIN">Administrator</option> */}
                                
                            </select>
                        </div>
                    </div>              
                    <div className="row justify-content-center">
                        <div className="text-center">
                            <ButtonWithProgress 
                                onClick={this.onClickSignup}
                                disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                                pendingApiCall={this.state.pendingApiCall}
                                text="Sign Up"
                            />
                        </div>
                        {/* <div className="col-lg-4 mb-3">
                            <button className="btn btn-primary mb-3" type="submit">Signup</button>
                        </div> */}
                    </div>  
                    </form>
                    {this.state.apiError && <p className="alert alert-danger">{this.state.apiError}</p>}
                </div>
            </div>
        );
    };
}


SignupPage.defaultProps = {
    match: {
        params: {}
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
}; 

export default connect(mapStateToProps)(withRouter(SignupPage));
/*const SignupPage = () => {
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
*/