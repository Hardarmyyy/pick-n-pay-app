// import { createSlice, isPending, isFulfilled, isRejected} from "@reduxjs/toolkit";
// import {SINGLEUSER, UPDATEUSERPROFILE} from "../Services/userApi";
// import { LOGOUT } from "../Services/authApi";
// import {toast} from 'react-toastify'



// const initialState = {
//     status: 'idle',
//     currentUser: null
// }

// export const userSlice = createSlice({ 
//     name:'user',
//     initialState,
//     reducers: {
        
//     },
//     extraReducers (builder) {
//         builder
//                 .addCase(SINGLEUSER.fulfilled, (state, action) => {
//                     const userInfo = action.payload.user
//                     state.currentUser = {userType: userInfo.roles, username: userInfo.username, email: userInfo.email}
//                 })
//                 .addCase(UPDATEUSERPROFILE.fulfilled, (state, action) => {
//                     const {message, updatedUser} = action.payload
//                     state.currentUser = {userType: updatedUser.roles, username: updatedUser.username, email: updatedUser.email}
//                     toast.success(message, {
//                         toastStyle: { background: 'green', color: 'white' }
//                     })
//                 })
//                 .addCase(LOGOUT.fulfilled, (state, action) => {
//                     const {message} = action.payload;
//                     if (message) {
//                         state.currentUser = null
//                     }
//                 }) 
//                 .addMatcher(
//                     isFulfilled(SINGLEUSER, UPDATEUSERPROFILE, LOGOUT),
//                     (state) => {
//                     state.status = 'success'
//                 }
//                 )
//                 .addMatcher(
//                     isPending(SINGLEUSER, UPDATEUSERPROFILE, LOGOUT),
//                     (state) => {
//                     state.status = 'Loading.......';
//                 }
//                 )
//                 .addMatcher(
//                     isRejected(SINGLEUSER, UPDATEUSERPROFILE, LOGOUT),
//                     (state, action) => {
//                         state.status = 'failed';
//                         const message = action.payload.error
//                         toast.error(message, {
//                             toastStyle: { background: 'red', color: 'white' }
//                         })
//                 }
//                 )
//     }
// })


// export default userSlice.reducer