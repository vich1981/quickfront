import axios from 'axios';
import { encodeBase64 } from '../redux/encoderFunctions';

// export const signup = (user) => {
//     return axios.post('/api/1.0/users', user);
// };

export const login = async (email,password) => {
    return await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
    }, { withCredentials: true });
};

export const setAuthorizationHeader = ({username, password, isLoggedIn }) => {
    if (isLoggedIn){
        axios.defaults.headers.common['Authorization'] = `Basic ${encodeBase64( 
            username + ':' + password
        )}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
    
};

export const loadMyStores = () => {
    return axios.get('http://localhost:8080/api/v1/my/store',{ withCredentials: true});
};

// export const listUsers = (param = { page: 0, size: 3 }) => {
//     const path = `/api/1.0/users?page=${param.page || 0}&size=${param.size || 3}`;
//     return axios.get(path);
// };

export const getUser = (id) => {
    return axios.get(`http://localhost:8080/api/v1/users/${id}`);
};

export const updateUser = (userId, body) => {
    return axios.put('http://localhost:8080/api/v1/users/update/' + userId, body,{withCredentials: true});
};

export const getStore = (storeId) => {
    return axios.get(`http://localhost:8080/api/v1/store/${storeId}`,{withCredentials: true});
};

export const getProducts = (storeId) => {
    return axios.get(`http://localhost:8080/api/v1/store/${storeId}/products`,{withCredentials: true});
};

export const getProduct = (productId) => {
    return axios.get(`http://localhost:8080/api/v1/product/${productId}`,{withCredentials: true});
};

export const createOrder = (body) => {
    return axios.post('http://localhost:8080/api/v1/orders/',body,{withCredentials: true});
}


// export const postHoax = (hoax) => {
//     return axios.post('/api/1.0/hoaxes', hoax);
// };

// export const loadHoaxes = (username) => {
//     const basePath = username 
//         ? `/api/1.0/users/${username}/hoaxes`
//         : '/api/1.0/hoaxes';
//     return axios.get(basePath + '?page=0&size=5&sort=id,desc');
// };

// export const loadOldHoaxes = (hoaxId, username) => {
//     const basePath = username 
//         ? `/api/1.0/users/${username}/hoaxes`
//         : '/api/1.0/hoaxes';
//     const path = `${basePath}/${hoaxId}?direction=before&page=0&size=5&sort=id,desc`;
//     return axios.get(path);
// };

// export const loadNewHoaxes = (hoaxId, username) => {
//     const basePath = username 
//         ? `/api/1.0/users/${username}/hoaxes`
//         : '/api/1.0/hoaxes';
//     const path = `${basePath}/${hoaxId}?direction=after&sort=id,desc`;
//     return axios.get(path);
// };
// export const loadNewHoaxCount = (hoaxId, username) => {
//     const basePath = username 
//         ? `/api/1.0/users/${username}/hoaxes`
//         : '/api/1.0/hoaxes';
//     const path = `${basePath}/${hoaxId}?direction=after&count=true`;
//     return axios.get(path);
// };