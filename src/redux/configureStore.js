import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import cartNewReducer from './cartNewReducer';
import { cartReducer } from './cartReducer';
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
        sessionId: '',
        username: '',
        email: '',
        location: '',
        role: '',
        image: '',
        password: '',
        isLoggedIn: false,
        cart: []
        //[
        //     {
        //         category: "Хлебобулочные изделия",
        //         description: "Ватрушка с творогом, 80 г.",
        //         id: 9,
        //         imageUrl: "________.webp_d004cac7-ce3e-4ba3-bc9d-276ec0907993.webp",
        //         name: "Ватрушка",
        //         price: "65.00",
        //         stock: 150
        //     },
        //     {
        //         category: "Хлебобулочные изделия",
        //         description: "Ватрушка с творогом, 80 г.",
        //         id: 9,
        //         imageUrl: "________.webp_d004cac7-ce3e-4ba3-bc9d-276ec0907993.webp",
        //         name: "Ватрушка",
        //         price: "65.00",
        //         stock: 150
        //     }

        // ]
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