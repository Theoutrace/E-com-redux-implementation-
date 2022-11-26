import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {cartItems:[], totalCost: 0},
    reducers: {
        addItem(state, action){
            state.cartItems = action.payload
            let totalCartValue = 0
            for(let i=0; i<action.payload.length; i++){
                totalCartValue = totalCartValue+ action.payload[i].totalPrice
            }
            state.totalCost = totalCartValue
            
        },
        removeItem(state, action){}
    }
})

export default cartSlice.reducer
export const cartActions = cartSlice.actions



