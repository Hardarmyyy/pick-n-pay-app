import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import {LOGIN, REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT} from '../Services/authApi'
import { decodeToken } from "../Utils/DecodeJwt";

export const initialState = {
    status: 'idle',
    isValid: false,
    accessToken: null,
    user: null,
}


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
    
    },
    extraReducers (builder) {
        builder 
                .addCase(REGISTERUSERS.fulfilled, (state, action) => { 
                    const {success, error} = action.payload;
                    state.status = 'success'
                    const message = action.payload.message
                    if (success) {
                        toast.success(message, {
                            toastStyle: { background: 'green', color: 'white' }
                        })
                    }
                    else if (error) {
                        toast.error(message, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                    }
                })
                .addCase(VERIFYEMAILTOKEN.fulfilled, (state, action) => { 
                    state.status = 'success'
                    const {success, error} = action.payload;
                    if (success) {
                        state.isValid = true
                    }
                })
                .addCase(VERIFYEMAIL.fulfilled, (state, action) => { 
                    const {success, error} = action.payload;
                    state.status = 'success'
                    const message = action.payload.message
                    if (success) {
                        toast.success(message, {
                            toastStyle: { background: 'green', color: 'white' }
                        })
                    }
                    else if (error) {
                        toast.error(message, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                    }
                })
                .addCase(LOGIN.fulfilled, (state, action) => {
                    const {success, error} = action.payload;
                    state.status = 'success'
                    const message = action.payload.message
                    if (success) {
                        toast.success(message, {
                            toastStyle: { background: 'green', color: 'white' }
                        })
                        state.accessToken = action.payload.token
                        state.user = decodeToken(action.payload.token)
                    }
                    else if (error) {
                        toast.error(message, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                    }
                })  
                .addCase(FORGOTPASSWORD.fulfilled, (state, action) => {
                    const {success, error} = action.payload;
                    state.status = 'success'
                    const message = action.payload.message
                    if (success) {
                        toast.success(message, {
                            toastStyle: { background: 'green', color: 'white' }
                        })
                    }
                    else if (error) {
                        toast.error(message, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                    }
                }) 
                .addCase(VERIFYRESETTOKEN.fulfilled, (state, action) => { 
                    state.status = 'success'
                    const {success, error} = action.payload;
                    if (success) {
                        state.isValid = true
                    }
                })
                .addCase(RESETPASSWORD.fulfilled, (state, action) => {
                    const {success, error} = action.payload;
                    state.status = 'success'
                    const message = action.payload.message
                    if (success) {
                        toast.success(message, {
                            toastStyle: { background: 'green', color: 'white' }
                        })
                    }
                    else if (error) {
                        toast.error(message, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                    }
                }) 
                .addCase(REFRESH.fulfilled, (state, action) => {
                    const {success} = action.payload;
                    state.status = 'success'
                    if (success) {
                        state.accessToken = action.payload.token
                        state.user = decodeToken(action.payload.token) // decode the access token to get the current user information
                    }
                }) 
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {success} = action.payload;
                    state.status = 'success'
                    if (success) {
                        state.user = null
                        state.accessToken = null
                    }
                }) 
                .addMatcher(
                    (action) => action.type.endsWith('/pending'),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    (action) => action.type.endsWith('/rejected'),
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


export default authSlice.reducer