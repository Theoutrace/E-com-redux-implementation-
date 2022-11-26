import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cart-reducer";



const Store = configureStore({
    reducer: {
        cart: cartReducer
    }
})


export default Store