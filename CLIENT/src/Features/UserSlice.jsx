import { createSlice, isPending, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {SINGLEUSER} from "../Services/userApi";
import { LOGOUT } from "../Services/authApi";



const initialState = {
    status: 'idle',
    currentUser: null
}

export const userSlice = createSlice({ 
    name:'user',
    initialState,
    reducers: {
        
    },
    extraReducers (builder) {
        builder
                .addCase(SINGLEUSER.fulfilled, (state, action) => {
                    const userInfo = action.payload.user
                    state.currentUser = {userType: userInfo.roles, username: userInfo.username, email: userInfo.email}
                })
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {message} = action.payload;
                    if (message) {
                        state.currentUser = null
                    }
                }) 
                .addMatcher(
                    isFulfilled(SINGLEUSER, LOGOUT),
                    (state) => {
                    state.status = 'success'
                }
                )
                .addMatcher(
                    isPending(SINGLEUSER, LOGOUT),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(SINGLEUSER, LOGOUT),
                    (state, action) => {
                        state.status = 'failed';
                        const message = action.payload.error
                        toast.error(message, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                }
                )
    }
})


export default userSlice.reducer