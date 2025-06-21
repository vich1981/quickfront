import React from "react";
import logo from '../assets/logoquickcart.png';
import cartImage from '../assets/cart.webp';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import "../css/TopBar.css";

class TopBar extends React.Component {

    state = {
        dropDownVisible: false,
        count: 0
    };
    componentDidMount() {
        document.addEventListener('click', this.onClickTracker);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClickTracker);
    }

    onClickTracker = (event) => {
        if(this.actionArea && !this.actionArea.contains(event.target)) {
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
        const action = {
            type: 'logout-success'
        };
        this.props.dispatch(action);
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
        if(this.props.user.cart)this.props.user.cart.forEach(element => {
            cartCount += parseInt(element.quantity);
        });
        this.state.count = cartCount;
    }


    render() {
        this.calculateCount();   
        let links = (
            <ul className="nav navbar-nav ms-auto">
                <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                        Sign Up
                    </Link>
                </li>     
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </ul> 
        );

        let orders;
        if(this.props.user.role =="BUYER"){
            orders = (
                <li className="nav-item">
                    <Link to="/orders/user" className="nav-link">Заказы</Link>
                </li>
            );
        }
        else if(this.props.user.role =="SELLER"){
            orders = (
                <li className="nav-item">
                    <Link to="/orders/store" className="nav-link">Заказы</Link>
                </li>
            );
        }
        if(this.props.user.isLoggedIn){
            let dropDownClass = 'p-0 shadow dropdown-menu';
            if(this.state.dropDownVisible){
                dropDownClass += ' show';
            }
            links = (
                <ul className="nav navbar-nav ms-auto" ref={this.assignActionArea}>
                    <li className="nav-item dropdown">
                        <div className="d-flex" style={{cursor: 'pointer'}} onClick={this.onClickDisplayName}>
                            <ProfileImageWithDefault 
                                className="rounded-circle m-auto"
                                width="32"
                                height="32"
                                image={this.props.user.image} 
                            />
                            <span className="nav-link dropdown-toggle">{this.props.user.username}(id:{this.props.user.id})</span>
                        </div>
                        <div 
                            className={dropDownClass} 
                            data-testid="drop-down-menu"
                        >
                            <Link 
                                to={`/users/${this.props.user.id}`} 
                                className="dropdown-item"
                                onClick={this.onClickMyProfile}
                            >
                                <i className="fas fa-user text-info"></i> Мой профиль
                            </Link>
                            <span className="dropdown-item" 
                                onClick={this.onClickLogout} 
                                style={{cursor:'pointer'}}
                            >
                                <i className="fas fa-sign-out-alt text-danger"></i> Logout
                            </span>
                            
                        </div>
                            
                    </li>
                    
                </ul> 
            );
        }
        return (
            <div className="bg-white shadow-sm mb-2 d-block">
                <div className="container">
                    <nav className="navbar navbar-light navbar-expand">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} width="60" alt="quickCart" /> Quick Cart
                        </Link>
                        <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link to="/store/all/store" className="nav-link">Магазины</Link>
                                </li>
                                {orders}
                            </ul>
                        </div>
                        <Link to ="/cart" className="link">
                            <button 
                                className="cart" 
                                id="cart"
                            >
                                <img className="cart__image" src={cartImage} width="50"
                                    height="50" alt="Cart" />
                                <div className="cart__num" id="cart_num">{this.state.count}</div>
                            </button>        
                        </Link>
                        
                        {links}
                    </nav>
                </div>  
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        user: state
    }
};

export default connect(mapStateToProps)(TopBar);