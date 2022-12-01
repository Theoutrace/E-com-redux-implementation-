import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-reducer";
import cartReducer from "./cart/cart-reducer";



const Store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    }
})


export default Store