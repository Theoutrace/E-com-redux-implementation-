import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profile',
    initialState: { favorite: [] },
    reducers: {
        addFav(state, action){
            state.favorite = action.payload.arr
        }
    }
})

export default profileSlice.reducer;
export const profileActions = profileSlice.actions
