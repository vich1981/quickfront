import React from 'react';
import { withRouter } from '../components/withRouter';
import * as apiCalls from '../api/apiCalls';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/Input';
import '../css/SignupPage.css';

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
        passwordRepeatConfirmed: true,
        locationLoading: false
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

    getCurrentLocation = () => {
        if (!navigator.geolocation) {
            this.setState({ apiError: 'Геолокация не поддерживается вашим браузером 🥲' });
            return;
        }
        this.setState({ locationLoading: true, apiError: '' });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.address) {
                            const { house_number, road, city} = data.address;
                            let address = '';
                            if (city) address += city + ", ";
                            if (road) address += road;
                            if (house_number) address += ', д.' + house_number;
                
                            this.setState({ location: address || 'Адрес не найден' });
                        } else {
                            this.setState({ location: 'Адрес не найден' });
                        }
                    })
                    .catch(() => {
                        this.setState({ apiError: 'Ошибка при получении адреса.' });
                    })
                    .finally(() => this.setState({ locationLoading: false }));
            },
            (error) => {
                this.setState({ locationLoading: false });
                let errorMsg = '';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = 'Доступ к геолокации запрещен. Разрешите доступ в настройках браузера.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = 'Информация о локации недоступна.';
                        break;
                    case error.TIMEOUT:
                        errorMsg = 'Время ожидания получения локации истекло.';
                        break;
                    default:
                        errorMsg = 'Неизвестная ошибка при получении локации.';
                }
                this.setState({ apiError: errorMsg });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    };

    render() {
        let locationLabel = this.state.role === 'BUYER'? 'Адрес доставки по умолчанию (Необязательно)': 
                            this.state.role === 'SELLER'? 'Юридический адрес (Необязательно)': 'Домашний адрес '; 
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-9">
                        <div className="card signup-card">
                            <div className="card-header signup-header text-center">
                                <h1 className="mb-1">Регистрация</h1>
                                <p>Создайте свой аккаунт</p>
                            </div>
                            <div className="card-body p-5">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label htmlFor="username" className="form-label fw-bold">Имя пользователя</label>
                                            <Input
                                                id="username"
                                                className="form-control form-control-lg"
                                                type="text"
                                                placeholder="Введите имя пользователя"
                                                value={this.state.username}
                                                onChange={this.onChangeUsername}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label fw-bold">Email</label>
                                            <Input
                                                id="email"
                                                className="form-control form-control-lg"
                                                type="email"
                                                placeholder="Введите ваш email"
                                                value={this.state.email}
                                                onChange={(e) => this.setState({ email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-4 mt-2">
                                        <div className="col-md-6">
                                            <label htmlFor="phone" className="form-label fw-bold">Телефон</label>
                                            <Input
                                                id="phone"
                                                className="form-control form-control-lg"
                                                type="text"
                                                placeholder="Номер телефона (Необязательно)"
                                                value={this.state.phone}
                                                onChange={(e) => this.setState({ phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="role" className="form-label fw-bold">Роль</label>
                                            <select
                                                id="role"
                                                className="form-select form-select-lg"
                                                aria-label="Выберите вашу роль"
                                                value={this.state.role}
                                                onChange={(e) => this.setState({ role: e.target.value })}
                                                required
                                            >
                                                <option value="BUYER">Покупатель</option>
                                                <option value="SELLER">Продавец</option>
                                                {/* <option value="MODER">Модератор</option>
                                                <option value="ADMIN">Администратор</option> */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row g-4 mt-2">
                                        <div className="col-12">
                                            <label htmlFor="location" className="form-label fw-bold">{locationLabel}</label>
                                            <div className="input-group">
                                                <Input
                                                    id="location"
                                                    className="form-control form-control-lg"
                                                    type="text"
                                                    placeholder={`Введите ${locationLabel.toLowerCase()}`}
                                                    value={this.state.location}
                                                    onChange={(e) => this.setState({ location: e.target.value })}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={this.getCurrentLocation}
                                                    disabled={this.state.locationLoading}
                                                    title="Получить текущую локацию"
                                                >
                                                    {this.state.locationLoading ? (
                                                        <i className="fas fa-spinner fa-spin"></i>
                                                    ) : (
                                                        <i className="fas fa-globe"></i>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-4 mt-2">
                                        <div className="col-md-6">
                                            <label htmlFor="password" className="form-label fw-bold">Пароль</label>
                                            <Input
                                                id="password"
                                                className="form-control form-control-lg"
                                                autoComplete="new-password"
                                                type="password"
                                                placeholder="Введите пароль"
                                                value={this.state.password}
                                                onChange={this.onChangePassword}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="passwordRepeat" className="form-label fw-bold">Повтор пароля</label>
                                            <Input
                                                id="passwordRepeat"
                                                className={`form-control form-control-lg ${
                                                    this.state.errors.passwordRepeat ? 'is-invalid' : 
                                                    (this.state.passwordRepeatConfirmed && this.state.passwordRepeat) ? 'is-valid' : ''
                                                }`}
                                                autoComplete="new-password"
                                                type="password"
                                                placeholder="Повторите пароль"
                                                value={this.state.passwordRepeat}
                                                onChange={this.onChangePasswordRepeat}
                                                hasError={this.state.errors.passwordRepeat && true}
                                                error={this.state.errors.passwordRepeat}
                                                required
                                            />
                                            {this.state.passwordRepeatConfirmed && this.state.passwordRepeat && (
                                                <div className="valid-feedback d-block">Пароли совпадают</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-grid mt-4">
                                        <ButtonWithProgress 
                                            onClick={this.onClickSignup}
                                            disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                                            pendingApiCall={this.state.pendingApiCall}
                                            text="Зарегистрироваться"
                                            className="btn btn-primary btn-lg rounded-pill"
                                        />
                                    </div>
                                </form>
                                {this.state.apiError && <div className="alert alert-danger mt-3">{this.state.apiError}</div>}
                            </div>
                        </div>
                    </div>
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
