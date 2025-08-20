import React from 'react';
import * as apiCalls from '../api/apiCalls';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { withRouter }  from '../components/withRouter';
import { connect } from 'react-redux';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с куками
import Spinner from '../components/Spinner';
import Input from '../components/Input';
//import { useDispatch } from 'react-redux';

class LoginPage extends React.Component{

    state = {
        email:'',
        password:'',
        isLogining: false,
        error: undefined
    };
    
    loginUser = (e) => {
        e.preventDefault();
        this.setState({isLogining: true});
        apiCalls.login(this.state.email, this.state.password)
        .then(response => {
            // this.setState({ isLogining: false});
            this.setState({ isLogining: false},() => {
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
                isLogining: false,
                error: 'Не удается войти, неверный email или пароль'
            })
        });     
    }

    // storeUser = () => {
    //     apiCalls.getUserByEmail(this.state.email)
    //     .then(response => {
    //         this.setState({ isLogining: false},() => {
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
    //             this.props.navigate('/store/all/store');
    //         })       
    //     })
    //     .catch((error) => {
    //         this.setState({
    //             isLogining: false,
    //             error: 'Не удается получить пользователя, попробуйте ещё раз'
    //         })
    //     });
    // }

    render() {
        let loginContent;
        if(this.state.isLogining){
            loginContent = (
                <Spinner />
            );
        } 
             
        return (
            <div data-testid="loginpage">

                {loginContent}

                <div className="container">
                    <h1 className="text-center">Login</h1>
                    <form className="text-center" onSubmit={this.loginUser}>
                        <div className="row justify-content-center">
                            <div className="col-lg-3 mb-3">
                                <Input
                                    className="input-group"
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({email: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-3 mb-3">
                                <Input
                                    className="input-group"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(e) => this.setState({password: e.target.value})}
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
                    {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}  
                </div>
            </div>
        )
    }    
}

LoginPage.defaultProps = {
    match: {
        params: {}
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
};

export default connect(mapStateToProps)(withRouter(LoginPage));
/*
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
                sessionId: user.data.sessionId,
                username: user.data.username,
                email: user.data.email,
                location: user.data.location,
                role: user.data.role,
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

export default LoginPage;*/
