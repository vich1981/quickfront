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
        //const navigate = useNavigate();
        apiCalls.logout()
        .then(response =>{
            Cookies.remove('sessionId', { path: '/' });

            // Проверяем, была ли кука удалена
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
        })
        
        
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
        return cartCount; 
    }


    render() {

        const theme = this.props.theme || 'light'; // 'dark' или 'light'
        const renderCount = this.calculateCount();  
        
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
        let cart;
        if(this.props.user.role ==="BUYER"){
            orders = (
                <li className="nav-item">
                    <Link to="/orders/user" className="nav-link">Заказы</Link>
                </li>
            );
            cart = (
                <Link to="/cart" className="link">
                    <button className="cart" id="cart">
                        <img className="cart__image" src={cartImage} width="50" height="50" alt="Cart" />
                        <div className="cart__num" id="cart_num">{renderCount}</div>
                    </button>
                </Link>
            );
        }
        else if(this.props.user.role ==="SELLER"){
            orders = (
                <>
                <li className="nav-item">
                    <Link to="/store/seller" className="nav-link">Мои магазины</Link>
                </li>
                <li className="nav-item">
                    <Link to="/orders/store" className="nav-link">Заказы</Link>
                </li>
                </>
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
            <div className={`topbar ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
              <div className="container">
                <nav className="navbar navbar-expand">
                  <Link to="/" className="navbar-brand">
                    <img src={logo} width="60" alt="quickCart" /> Quick Cart
                  </Link>
                  <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link to="/store/all/store" className="nav-link">Магазины</Link>
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
    };
}

const mapStateToProps = (state) => {
    return {
        user: state
    }
};

export default connect(mapStateToProps)(withRouter(TopBar));