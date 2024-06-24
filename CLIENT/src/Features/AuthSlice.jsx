import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import {LOGIN, REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT} from '../Services/authApi'
import { SINGLEUSER, UPDATEUSERPROFILE, UPDATEPASSWORD, DELETEUSER, SWICTHPROFILE } from "../Services/userApi";
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
                    const decodedUser = decodeToken(token)
                    state.accessToken = token
                    state.user = {userID: decodedUser.userId, userName: decodedUser.username, email:decodedUser.email, userRole: decodedUser.userRole}
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
                        const decodedUser = decodeToken(action.payload.token)
                        state.user = {userID: decodedUser.userId, userName: decodedUser.username, email:decodedUser.email, userRole: decodedUser.userRole}
                    }
                }) 
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {message} = action.payload;
                    state.user = null
                    state.accessToken = null
                }) 
                .addCase(SINGLEUSER.fulfilled, (state, action) => {
                    const userInfo = action.payload.user
                    state.user = {userID: userInfo.userId, userName: userInfo.username, userRole: userInfo.roles, email: userInfo.email}
                })
                .addCase(UPDATEUSERPROFILE.fulfilled, (state, action) => {
                    const {message, token} = action.payload
                    const decodedUser = decodeToken(token)
                    state.accessToken = token
                    state.user = {userID: decodedUser.userId, userName: decodedUser.username, email:decodedUser.email, userRole: decodedUser.userRole}
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(UPDATEPASSWORD.fulfilled, (state, action) => {
                    const {message} = action.payload
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(DELETEUSER.fulfilled, (state, action) => {
                    const {message} = action.payload
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(SWICTHPROFILE.fulfilled, (state, action) => {
                    const {message, token} = action.payload
                    const decodedUser = decodeToken(token)
                    state.accessToken = token
                    state.user = {userID: decodedUser.userId, userName: decodedUser.username, email:decodedUser.email, userRole: decodedUser.userRole}
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addMatcher(
                    isFulfilled(REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, LOGIN, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT, SINGLEUSER, UPDATEUSERPROFILE, UPDATEPASSWORD, DELETEUSER, SWICTHPROFILE),
                    (state) => {
                    state.status = 'success';
                }
                )
                .addMatcher(
                    isPending(REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, LOGIN, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT, UPDATEUSERPROFILE, UPDATEPASSWORD, DELETEUSER),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(REGISTERUSERS, VERIFYEMAILTOKEN, VERIFYEMAIL, LOGIN, FORGOTPASSWORD, VERIFYRESETTOKEN, RESETPASSWORD, REFRESH, LOGOUT, SINGLEUSER, UPDATEUSERPROFILE, UPDATEPASSWORD, DELETEUSER, SWICTHPROFILE),
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