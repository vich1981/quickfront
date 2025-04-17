const initialState = {
        id: 0,
        username: '',
        email: '',
        location: '',
        role: '',
        image: '',
        password: '',
        isLoggedIn: false
};

export default function authReducer(state = initialState, action) {
    if (action.type === 'logout-success'){
        return { ...initialState };
    } else if (action.type === 'login-success'){
        return {
            ...action.payload,
            isLoggedIn: true
        };
    } else if(action.type === 'update-success'){
        return {
            ...state,
            username: action.payload.username,
            location: action.payload.location,
            image: action.payload.image
        };
    }
    return state;
}