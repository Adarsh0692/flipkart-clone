import { createSlice } from "@reduxjs/toolkit";


 const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userName: null,
        userEmail: null,
        userID: null,
        addresses: []
    },
    reducers: {
       setUser: (state, action) => {
        state.userName = action.payload.userName
        state.userEmail = action.payload.userEmail
        state.userID = action.payload.userID
       },
       setLogoutUser: (state) => {
        state.userName = null
        state.userEmail = null
        state.userID = null
       },
       setAddress: (state, action) => {
        state.addresses.unshift(action.payload)
       }
    }
})

export const {setUser, setLogoutUser, setAddress} = authSlice.actions

export const selectUserName = state => state.auth.userName
export const selectUserEmail = state => state.auth.userEmail
export const selectUserID = state => state.auth.userID

export default authSlice.reducer;