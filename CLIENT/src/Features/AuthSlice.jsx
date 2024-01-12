import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import {LOGIN, REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT} from '../Services/authApi'
import { decodeToken } from "../Utils/DecodeJwt";

export const initialState = {
    status: 'idle',
    isValid: false,
    isVerified: false,
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
                    const message = action.payload.message
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(VERIFYEMAILTOKEN.fulfilled, (state, action) => { 
                    const {verified, message} = action.payload;
                    if (verified) {
                        state.isVerified = true
                    }
                    else if (message) {
                        state.isValid = true
                    }
                })
                .addCase(VERIFYEMAIL.fulfilled, (state, action) => { 
                    const message = action.payload.message
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(LOGIN.fulfilled, (state, action) => {
                    state.accessToken = action.payload.token
                    state.user = decodeToken(action.payload.token)
                    const message = action.payload.message
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })  
                .addCase(FORGOTPASSWORD.fulfilled, (state, action) => {
                    const message = action.payload.message
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                }) 
                .addCase(VERIFYRESETTOKEN.fulfilled, (state, action) => { 
                    const {message} = action.payload;
                    if (message) {
                        state.isValid = true
                    }
                })
                .addCase(RESETPASSWORD.fulfilled, (state, action) => {
                    const message = action.payload.message
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                }) 
                .addCase(REFRESH.fulfilled, (state, action) => {
                    const token = action.payload.token;
                    if (token) {
                        state.accessToken = token
                        state.user = decodeToken(token) // decode the access token to get the current user information
                    }
                }) 
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {message} = action.payload;
                    if (message) {
                        state.user = null
                        state.accessToken = null
                    }
                }) 
                .addMatcher(
                    isFulfilled(REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, LOGIN, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT),
                    (state) => {
                    state.status = 'success';
                }
                )
                .addMatcher(
                    isPending(REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, LOGIN, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, LOGIN, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT),
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