import { createSlice } from "@reduxjs/toolkit";


 const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginUser: null,
    },
    reducers: {
       setUser: (state, action) => {
        state.loginUser = action.payload
       },
       logoutUser: (state) => {
        state.loginUser = null
       }
    }
})

export const {setUser, logoutUser} = authSlice.actions
export default authSlice.reducer;