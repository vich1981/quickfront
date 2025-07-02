import axios from 'axios';
import { encodeBase64 } from '../redux/encoderFunctions';
import { useNavigate } from 'react-router-dom';

// export const signup = (user) => {
//     return axios.post('/api/1.0/users', user);
// };


const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // our API base URL
});

api.interceptors.response.use(response => response, 
    error => {
   
        if (error.response.status === 403) {
            localStorage.clear();
            window.location.href = "/";
          }
      
        // reject with error if response status is not 403
        return Promise.reject(error);
    }
);


export const login = async (email,password) => {
    return await api.post('/auth/login', {
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

export const getMyStores = () => {
    return api.get('/store/my/store',{ withCredentials: true});
};

// export const listUsers = (param = { page: 0, size: 3 }) => {
//     const path = `/api/1.0/users?page=${param.page || 0}&size=${param.size || 3}`;
//     return axios.get(path);
// };

export const getUser = (id) => {
    return api.get(`/users/${id}`);
};

export const updateUser = (userId, body) => {
    return api.put('/users/update/' + userId, body,{withCredentials: true});
};

export const getStore = (storeId) => {
    return api.get(`/store/${storeId}`,{withCredentials: true});
};

export const getProducts = (storeId) => {
    return api.get(`/store/${storeId}/products`,{withCredentials: true});
};

export const getProduct = (productId) => {
    return api.get(`/product/${productId}`,{withCredentials: true});
};

export const createOrder = (body) => {
    return api.post('/orders/',body,{withCredentials: true});
}

export const getOrders = (userId) => {
    return api.get(`/orders/user/${userId}`,{withCredentials: true});
}

export const getStoreOrders = (storeId) => {
    return api.get(`/orders/store/${storeId}`,{withCredentials: true});
}

export const getOrder = (id) => {
    return api.get(`/orders/${id}`, {withCredentials: true});
}

export const updateOrderStatus = (id, body) => {
    return api.patch(`/orders/update/${id}`, body, {withCredentials: true});
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