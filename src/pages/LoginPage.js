import React from 'react';
import * as apiCalls from '../api/apiCalls';
import { withRouter }  from '../components/withRouter';
import { connect } from 'react-redux';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с куками
import Spinner from '../components/Spinner';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';

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
        })
        .catch((error) => {
            this.setState({
                isLogining: false,
                error: 'Не удается войти, неверный email или пароль'
            })
        });     
    }

    render() {
        // let loginContent;
        // if(this.state.isLogining){
        //     loginContent = (
        //         <Spinner />
        //     );
        // } 
             
        return (
            <div data-testid="loginpage">

                {/* {loginContent} */}

                <div className="col-lg-6 mt-3 offset-3 rounded shadow p-1">
                    <h1 className="text-center">Login</h1>
                    <form className="text-center" onSubmit={this.loginUser}>
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-6 mb-3">
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
                            <div className="col-lg-6 col-md-6 mb-3">
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
                                <ButtonWithProgress 
                                    className="btn btn-primary mb-3" 
                                    type="submit"
                                    text="Login"
                                    pendingApiCall={this.state.isLogining}
                                />
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
