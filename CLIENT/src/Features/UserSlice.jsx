import { createSlice } from "@reduxjs/toolkit";
import {FETCHREGISTEREDUSERS, SINGLEUSER } from "../Services/userApi";
import { LOGOUT } from "../Services/authApi";


const initialState = {
    status: 'idle',
    allRegisteredUsers: [],
    currentUser: [],
    error: null
}

export const usersSlice = createSlice({ 
    name:'users',
    initialState,
    reducers: {
        
    },
    extraReducers (builder) {
        builder
                .addCase(FETCHREGISTEREDUSERS.fulfilled, (state, action) => {
                    const {success} = action.payload
                    if (success) {
                        state.status = 'success'
                        const allRegisteredUsers = action.payload.user
                        state.allRegisteredUsers = [...allRegisteredUsers]
                    }
                })
                .addCase(SINGLEUSER.fulfilled, (state, action) => {
                    const {success} = action.payload
                    if (success) {
                        state.status = 'success'
                        const activeUser = action.payload.user
                        state.currentUser = [activeUser]
                    }
                })
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {success} = action.payload
                    if (success) {
                        state.status = 'success'
                        state.allRegisteredUsers = null
                        state.currentUser = null
                    }
                })
                .addMatcher(
                    (action) => action.type.endsWith('/pending'),
                    (state) => {
                    state.status = 'Loading';
                }
                )
                .addMatcher(
                    (action) => action.type.endsWith('/rejected'),
                    (state) => {
                    state.status = 'failed';
                    state.error = action.error.message
                }
                )
    }
})


export default usersSlice.reducer