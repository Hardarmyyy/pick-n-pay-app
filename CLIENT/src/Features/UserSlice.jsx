import { createSlice, isPending, isFulfilled, isRejected} from "@reduxjs/toolkit";
import { LOGIN, REFRESH, LOGOUT } from "../Services/authApi";
import { UPDATEUSERPROFILE, UPDATEPASSWORD, DELETEUSER, SWICTHPROFILE } from "../Services/userApi";
import { decodeToken } from "../Utils/DecodeJwt";
import {toast} from 'react-toastify'



const initialState = {
    status: 'idle',
    user: null,
    isDelete: false
}

export const userSlice = createSlice({ 
    name:'user',
    initialState,
    reducers: {
        OPENMODAL: (state) => {
            state.isDelete = !state.isDelete
        }
    },
    extraReducers (builder) {
        builder
                .addCase(LOGIN.fulfilled, (state, action) => {
                    const {token} = action.payload
                    const decodedUser = decodeToken(token)
                    state.user = decodedUser
                }) 
                .addCase(REFRESH.fulfilled, (state, action) => {
                    const {token} = action.payload;
                    if (token) {
                        const decodedUser = decodeToken(token)
                        state.user = decodedUser
                    }
                }) 
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {message} = action.payload;
                    if (message) {
                        state.user = null
                    }
                }) 
                .addCase(UPDATEUSERPROFILE.fulfilled, (state, action) => {
                    const {token, message} = action.payload
                    const decodedUser = decodeToken(token)
                    state.user = decodedUser
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
                    state.user = null
                    toast.success(message, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(SWICTHPROFILE.fulfilled, (state, action) => {
                    const {token} = action.payload
                    const decodedUser = decodeToken(token)
                    state.user = {...state.user, userRole: decodedUser.userRole}
                })
                .addMatcher(
                    isFulfilled(UPDATEUSERPROFILE, UPDATEPASSWORD, DELETEUSER, SWICTHPROFILE),
                    (state) => {
                    state.status = 'success'
                }
                )
                .addMatcher(
                    isPending(UPDATEUSERPROFILE, UPDATEPASSWORD, DELETEUSER, SWICTHPROFILE),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(UPDATEUSERPROFILE, UPDATEPASSWORD, DELETEUSER, SWICTHPROFILE),
                    (state, action) => {
                        state.status = 'failed';
                        const err = action.payload.error
                        toast.error( err, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                }
                )
    }
})

export const {OPENMODAL} = userSlice.actions
export default userSlice.reducer