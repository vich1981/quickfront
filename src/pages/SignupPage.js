import React from 'react';
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
        phone: '',
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
            phone: this.state.phone,
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
    };
    
    login = () => {
        this.setState({pendingApiCall: true});
        apiCalls.login(this.state.email, this.state.password)
        .then(response => {
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
        })
        .catch((error) => {
            this.setState({
                pendingApiCall: false,
                apiError: 'Не удается войти, неверный email или пароль'
            })
        });     
    };

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
        let locationLabel = this.state.role === 'BUYER'? 'Адрес доставки по умолчанию': 
                            this.state.role === 'SELLER'? 'Юридический адрес': 'Домашний адрес'; 
        return (
            <div>
                <div className="col-lg-6 mt-3 offset-lg-3 rounded shadow p-1">
                    <h1 className="text-center">Sign up</h1>
                    <form className="text-center" onSubmit={this.onClickSignup}>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 mb-3">
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Имя пользователя"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 mb-3">
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
                        <div className="col-lg-6 col-md-6 mb-3">
                            <Input
                                className="form-control"
                                type="text"
                                placeholder="Телефон"
                                value={this.state.phone}
                                onChange={(e) => this.setState({ phone: e.target.value })}
                                required
                            />
                        </div>
                    </div> 
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 mb-3">
                            <Input
                                className="form-control"
                                type="text"
                                placeholder={locationLabel}
                                value={this.state.location}
                                onChange={(e) => this.setState({ location: e.target.value })}
                                required
                            />
                        </div>
                    </div> 
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 mb-3">
                            <Input
                                className="form-control"
                                autoComplete="current-password"
                                type="password"
                                placeholder="Пароль"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 mb-3">
                            <Input
                                className="form-control"
                                //autoComplete="current-password"
                                type="password"
                                placeholder="Повтор пароля"
                                value={this.state.passwordRepeat}
                                onChange={this.onChangePasswordRepeat}
                                hasError={this.state.errors.passwordRepeat && true}
                                error={this.state.errors.passwordRepeat}
                                required
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 mb-3">
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