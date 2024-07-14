import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import {LOGIN, REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT} from '../Services/authApi'
import { UPDATEUSERPROFILE, SWICTHPROFILE, DELETEUSER } from "../Services/userApi";

export const initialState = {
    status: 'idle',
    isValid: false,
    isVerified: false,
    accessToken: null
}


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
    
    },
    extraReducers (builder) {
        builder 
                .addCase(REGISTERUSERS.fulfilled, (state, action) => { 
                    const message = action.payload.success
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
                    const {token, message} = action.payload
                    state.accessToken = token
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
                    }
                }) 
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {message} = action.payload; 
                    state.accessToken = null
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                }) 
                .addCase(UPDATEUSERPROFILE.fulfilled, (state, action) => {
                    const {token} = action.payload
                    state.accessToken = token
                })
                .addCase(SWICTHPROFILE.fulfilled, (state, action) => {
                    const {message, token} = action.payload
                    state.accessToken = token
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(DELETEUSER.fulfilled, (state, action) => {
                    state.accessToken = null
                })
                .addMatcher(
                    isFulfilled(REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, LOGIN, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT),
                    (state) => {
                    state.status = 'success';
                }
                )
                .addMatcher(
                    isPending(REGISTERUSERS, VERIFYEMAILTOKEN, LOGIN, FORGOTPASSWORD, VERIFYRESETTOKEN, REFRESH),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isPending( VERIFYEMAIL, RESETPASSWORD, LOGOUT ),
                    (state) => {
                    state.status = 'Loading...';
                }
                )
                .addMatcher(
                    isRejected(REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, LOGIN, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT),
                    (state, action) => {
                        state.status = 'failed';
                        const err = action.payload.error
                        toast.error(err, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                }
                )
    }
})


export default authSlice.reducer