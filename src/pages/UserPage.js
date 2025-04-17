import React from 'react';
import * as apiCalls from '../api/apiCalls';
import { withRouterParam }  from '../components/withRouterParam';
import ProfileCard from '../components/ProfileCard';
import { connect } from 'react-redux';
import SellerStore from '../components/SellerStore';
import BuyerStore from '../components/BuyerStore';
import Spinner from '../components/Spinner';

class UserPage extends React.Component{
    state = {
        user: undefined,
        userNotFound: false,
        isLoadingUser: false,
        inEditMode: false,
        originalUsername: undefined,
        originalLocation: undefined,
        pendingUpdateCall: false,
        image: undefined,
        errors: {}

    };

    componentDidMount(){
        this.loadUser();
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.username !== this.props.match.params.username){
            this.loadUser();
        }
    }

    loadUser = () => {
        const userId = this.props.match.params.id;
        if (!userId){
            return;
        }
        this.setState({ userNotFound: false, isLoadingUser: true });
        apiCalls.getUser(userId)
        .then(response => {
            this.setState({ user: response.data, isLoadingUser: false })
        })
        .catch(error => {
            this.setState({ 
                userNotFound: true,
                isLoadingUser: false
            });
        });
    };

    onClickEdit = () => {
        this.setState({
            inEditMode: true
        });
    };

    onClickCancel = () => {
        const user = { ...this.state.user}
        if(this.state.originalUsername !== undefined){
            user.username = this.state.originalUsername;
        }
        this.setState({
            user,
            errors: {},
            originalUsername: undefined,
            inEditMode: false,
            image: undefined
        });
    };

    onClickSave = () => {
        const userId = this.props.loggedInUser.id;
        const userUpdate = {
            username: this.state.user.username,
            location: this.state.user.location,
            image: this.state.image && this.state.image.split(',')[1]
        };
        this.setState({pendingUpdateCall: true})
        apiCalls.updateUser(userId, userUpdate)
            .then(response => {
                const user = {...this.state.user}
                user.image = response.data.image;
                this.setState({
                    inEditMode: false,
                    originalUsername: undefined,
                    originalLocation: undefined,
                    pendingUpdateCall: false,
                    user,
                    image: undefined
                }, () => {
                    const action = {
                        type:'update-success',
                        payload: user
                    };
                    this.props.dispatch(action);
                });
            })
            .catch((error) => {
                let errors = {};
                if(error.response.data.validationErrors){
                    errors = error.response.data.validationErrors;
                }
                this.setState({
                    pendingUpdateCall: false,
                    errors
                })
            });
    };

    onChangeUsername = (event) => {
        const user = { ...this.state.user };
        let originalUsername = this.state.originalUsername;
        if(originalUsername === undefined){
            originalUsername = user.username;
        }
        user.username = event.target.value;
        const errors = { ...this.state.errors};
        errors.username = undefined;
        this.setState({user, originalUsername, errors });
    }
    onChangeLocation = (event) => {
        const user = { ...this.state.user };
        let originalLocation = this.state.originalLocation;
        if(originalLocation === undefined){
            originalLocation = user.location;
        }
        user.location = event.target.value;
        const errors = { ...this.state.errors};
        errors.location = undefined;
        this.setState({user, originalLocation, errors });
    }


    onFileSelect = (event) => {
        if(event.target.files.length === 0){
            return;
        }
        const errors = { ...this.state.errors };
        errors.image = undefined;
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                image: reader.result,
                errors
            })
        }
        reader.readAsDataURL(file);
    }

    render() {
        let userContent;
        let storeContent;
        if(this.state.isLoadingUser) {
            userContent = (
                <Spinner />
            );
        }
        else if(this.state.userNotFound){
            userContent = (
                <div className="alert alert-danger text-center">
                    <div className="alert-heading">
                        <i className="fas fa-exclamation-triangle fa-3x" />
                    </div>
                    <h5>User not found</h5>
                </div>
            );
        }
        else {
            const isEditable = true;//this.props.loggedInUser.username === this.props.match.params.username;
            userContent = this.state.user && (
                <ProfileCard 
                    user={this.state.user} 
                    isEditable={isEditable}
                    inEditMode={this.state.inEditMode} 
                    onClickEdit={this.onClickEdit}
                    onClickCancel={this.onClickCancel}
                    onClickSave={this.onClickSave}
                    onChangeUsername={this.onChangeUsername}
                    onChangeLocation={this.onChangeLocation}
                    pendingUpdateCall={this.state.pendingUpdateCall}
                    loadedImage={this.state.image}
                    onFileSelect={this.onFileSelect}
                    errors={this.state.errors}
                />
            );
        }
        
        if(this.state.isLoadingUser) {
            storeContent = (
                <Spinner />
            );
        }
        else{
            let role;
            if(this.state.user) {role = this.state.user.role;}
            if(role){
                if(role == 'SELLER'){
                    storeContent = (
                        <SellerStore user={this.state.user.username} />
                    );
                }
                if(role == 'BUYER'){
                    storeContent = (
                        <BuyerStore user={this.state.user.id} />
                    );
                }
            }
            else {
                storeContent = (
                    <h5>Права пользователя не определены</h5>
                )
            }
        }
        
        return (
            <div data-testid="userpage">
                <div className="row">
                    <div className="col">
                        {storeContent}
                    </div>
                    <div className="col-lg-4">
                        {userContent}
                    </div>
                    
                </div>
            </div>
        );
    }
}

UserPage.defaultProps = {
    match: {
        params: {}
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
};

export default connect(mapStateToProps)(withRouterParam(UserPage));