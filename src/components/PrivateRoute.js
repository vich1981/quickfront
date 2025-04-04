import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component }) => {
    const isAuthenticated = !!Cookies.get('sessionId');

    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
