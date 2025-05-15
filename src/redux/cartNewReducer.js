const initialState = {
    id: 0,
    username: '',
    email: '',
    location: '',
    role: '',
    image: '',
    password: '',
    isLoggedIn: false,
    cart: 0
    // [
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

export default function cartNewReducer(state = initialState, action) {
    if (action.type === 'addNewProduct'){
        const cartNew = state.cart + 1;//[...state.cart,{...action.action.payload, quantity : 1}]
        return {
            ...state, 
            cart: cartNew,
            location: "Russia"
        };
    }
    return {
        ...state, 
        cart: 10,
        location: "Russia"
    };
}
