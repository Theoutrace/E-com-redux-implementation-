import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], totalCost: 0 },
  reducers: {
    addItem(state, action) {
      state.cartItems = action.payload.arr;
      state.totalCost = action.payload.cartTotal;
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
