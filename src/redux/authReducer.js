

const initialState = {
        id: 0,
        username: '',
        email: '',
        location: '',
        role: '',
        image: '',
        password: '',
        isLoggedIn: false,
        cart: []
        
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
    } else if(action.type === 'addNewProduct'){
        let newCart;
        if(state.cart) newCart = JSON.parse(JSON.stringify(state.cart));
        let itemInCart;
        if(newCart) itemInCart = newCart.find((item) => item.id === action.payload.id);
        else newCart = [];
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            newCart.push({ ...action.payload, quantity: 1 });
        }
        return {
            ...state,
            cart: newCart
        };
        
    } else if(action.type === 'removeProduct'){
        let removeItem;
        removeItem = JSON.parse(JSON.stringify(state.cart));
        let newCart = removeItem.filter((item) => item.id !== action.payload.id);
        return {
            ...state,
            cart: newCart
        };
    } else if(action.type === 'decrementProduct'){
        let newCart;
        newCart = JSON.parse(JSON.stringify(state.cart));
        let decrementItem = newCart.find((item) => item.id === action.payload.id);
        if(decrementItem.quantity > 1) decrementItem.quantity--;
        return {
            ...state,
            cart: newCart
        };
    } else if(action.type === 'incrementProduct'){
        let newCart;
        newCart = JSON.parse(JSON.stringify(state.cart));
        let incrementItem = newCart.find((item) => item.id === action.payload.id);
        incrementItem.quantity++;
        return {
            ...state,
            cart: newCart
        };
    } else if(action.type === 'removeAll'){
        let newCart = [];
        return {
            ...state,
            cart: newCart
        };
    }
    return state;
}

