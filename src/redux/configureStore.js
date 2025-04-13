import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import logger from 'redux-logger';
import * as apiCalls from '../api/apiCalls';

// const loggedInState = {
//   id: 1,
//   username: 'user1',
//   displayName: 'display1',
//   image: 'logo.png',
//   password: 'P4ssword',
//   isLoggedIn: true
// };

const configStore = (addLogger = true) => {

    let localStorageData = localStorage.getItem('quickCart-auth');

    let persistedState = {
        id: 0,
        username: '',
        email: '',
        location: '',
        image: '',
        password: '',
        isLoggedIn: false
    };

    if (localStorageData) {
        try{
            persistedState = JSON.parse(localStorageData);
            apiCalls.setAuthorizationHeader(persistedState);
        } catch (error) {}
    }
    const store = addLogger
    ? configureStore({
        reducer: authReducer,
        preloadedState: persistedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
    })
    : configureStore({
        reducer: authReducer,
        preloadedState: persistedState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    });

    store.subscribe(() => {
        localStorage.setItem('quickCart-auth', JSON.stringify(store.getState()));
        apiCalls.setAuthorizationHeader(store.getState());
    });

    return store;

};
export default configStore;