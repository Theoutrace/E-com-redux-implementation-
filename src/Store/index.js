import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-reducer";
import cartReducer from "./cart/cart-reducer";
import profileReducer from "./profile/profile-reducer";

const Store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

export default Store;
