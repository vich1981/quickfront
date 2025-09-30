import React from "react";
import logo from '../assets/logoquickcart.png';
import cartImage from '../assets/cart.webp';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import "../css/TopBar.css";
import Cookies from 'js-cookie';
import { withRouter } from "./withRouter";
import * as apiCalls from '../api/apiCalls';

class TopBar extends React.Component {
    state = {
        dropDownVisible: false
    };

    componentDidMount() {
        document.addEventListener('click', this.onClickTracker);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickTracker);
    }

    onClickTracker = (event) => {
        if (this.actionArea && !this.actionArea.contains(event.target)) {
            this.setState({
                dropDownVisible: false
            });
        }
    };

    onClickDisplayName = () => {
        this.setState({
            dropDownVisible: true
        });
    };

    onClickLogout = () => {
        this.setState({
            dropDownVisible: false
        });
        apiCalls.logout()
            .then(response => {
                Cookies.remove('sessionId', { path: '/' });
                const cookieExists = Cookies.get('sessionId');
                if (!cookieExists) {
                    console.log('sessionId cookie successfully removed.');
                } else {
                    console.log('Failed to remove sessionId cookie.');
                }
                const action = {
                    type: 'logout-success'
                };
                this.props.dispatch(action);
                this.props.navigate('/store/all/store');
            })
            .catch(error => {
                console.log(`Невозможно выполнить выход: ${error.message}`);
            });
    };

    onClickMyProfile = () => {
        this.setState({
            dropDownVisible: false
        });
    };

    assignActionArea = (area) => {
        this.actionArea = area;
    };

    calculateCount = () => {
        let cartCount = 0;
        if (this.props.user.cart) this.props.user.cart.forEach(element => {
            cartCount += parseInt(element.quantity);
        });
        return cartCount;
    }

    render() {
        const theme = this.props.theme || 'light';
        const renderCount = this.calculateCount();

        let links = (
            <ul className="nav navbar-nav ms-auto topbar-nav"> {/* Добавил класс для стилей */}
                <li className="nav-item">
                    <Link to="/signup" className="nav-link topbar-link"> {/* Добавил класс для hover-эффекта */}
                        <i className="fas fa-user-plus me-1"></i>Sign Up {/* Иконка для привлекательности */}
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link topbar-link">
                        <i className="fas fa-sign-in-alt me-1"></i>Login
                    </Link>
                </li>
            </ul>
        );

        let orders;
        let cart;
        if (this.props.user.role === "BUYER") {
            orders = (
                <li className="nav-item">
                    <Link to="/orders/user" className="nav-link topbar-link">
                        <i className="fas fa-shopping-bag me-1"></i>Заказы {/* Иконка */}
                    </Link>
                </li>
            );
            cart = (
                <Link to="/cart" className="topbar-cart-link">
                    <div className="topbar-cart-container">
                        <i className="fas fa-shopping-cart topbar-cart-icon"></i> {}
                        {renderCount > 0 && (
                            <span className="topbar-cart-badge">{renderCount}</span>
                        )}
                    </div>
                </Link>
            );
            
        } else if (this.props.user.role === "SELLER") {
            orders = (
                <>
                    <li className="nav-item">
                        <Link to="/store/seller" className="nav-link topbar-link">
                            <i className="fas fa-store me-1"></i>Мои магазины
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/orders/store" className="nav-link topbar-link">
                            <i className="fas fa-clipboard-list me-1"></i>Заказы
                        </Link>
                    </li>
                </>
            );
        }

        if (this.props.user.isLoggedIn) {
            let dropDownClass = 'p-0 shadow dropdown-menu topbar-dropdown';
            if (this.state.dropDownVisible) {
                dropDownClass += ' show';
            }
            links = (
                <ul className="nav navbar-nav ms-auto topbar-nav" ref={this.assignActionArea}>
                    <li className="nav-item dropdown">
                        <div className="d-flex topbar-user" style={{ cursor: 'pointer' }} onClick={this.onClickDisplayName}> {}
                            <ProfileImageWithDefault
                                className="rounded-circle m-auto d-none d-sm-block topbar-avatar"
                                width="32"
                                height="32"
                                image={this.props.user.image}
                            />
                            <span className="nav-link dropdown-toggle topbar-username"> {}
                                {this.props.user.username}
                                <span className="d-none d-md-inline">(id:{this.props.user.id})</span>
                            </span>
                        </div>
                        <div
                            className={dropDownClass}
                            data-testid="drop-down-menu"
                        >
                            <Link
                                to={`/users/${this.props.user.id}`}
                                className="dropdown-item topbar-dropdown-item"
                                onClick={this.onClickMyProfile}
                            >
                                <i className="fas fa-user text-info"></i> Мой профиль
                            </Link>
                            <span className="dropdown-item topbar-dropdown-item"
                                onClick={this.onClickLogout}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="fas fa-sign-out-alt text-danger"></i> Logout
                            </span>
                        </div>
                    </li>
                </ul>
            );
        }

        return (
            <div className={`topbar ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand topbar-navbar"> {}
                        <Link to="/" className="navbar-brand topbar-brand"> {}
                            <img src={logo} width="60" alt="quickCart" className="topbar-logo" /> {}
                            <span className="d-none d-sm-inline topbar-title">Quick Cart</span> {}
                        </Link>
                        <button className="navbar-toggler topbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span> {}
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mb-2 mb-lg-0 topbar-nav-main"> {}
                                <li className="nav-item">
                                    <Link to="/store/all/store" className="nav-link topbar-link">
                                        <i className="fas fa-store me-1"></i>Магазины {}
                                    </Link>
                                </li>
                                {orders}
                            </ul>
                        </div>
                        {cart}
                        {links}
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state
    }
};

export default connect(mapStateToProps)(withRouter(TopBar));
