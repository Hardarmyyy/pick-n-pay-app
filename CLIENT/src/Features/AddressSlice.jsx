import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { ADDSHIPPINGADDRESS, FETCHADDRESSLIST, UPDATEADDRESS, DELETEADDRESS } from "../Services/addressApi";
import { LOGOUT } from "../Services/authApi";
import {toast} from 'react-toastify'


export const initialState = {
    status: 'idle',
    shippingAddress: []
}

export const addressSlice = createSlice({
    name:'address',
    initialState,
    reducers: {
    
    },
    extraReducers (builder) {
        builder 
                .addCase(ADDSHIPPINGADDRESS.fulfilled, (state, action) => { 
                    const {success, newShippingAddress} = action.payload;
                    if (success) {
                        state.shippingAddress = [newShippingAddress, ...state.shippingAddress]
                    }
                })
                .addCase(FETCHADDRESSLIST.fulfilled, (state, action) => { 
                    const {success, shippingAddress} = action.payload;
                    if (success) {
                        state.shippingAddress = [...shippingAddress]
                    }
                })
                .addCase(UPDATEADDRESS.fulfilled, (state, action) => { 
                    const {success, updatedShippingAddress} = action.payload;

                    const updatedAddressList = state.shippingAddress.filter((address) => address._id !== updatedShippingAddress._id)
                    state.shippingAddress = [updatedShippingAddress, ...updatedAddressList]
                    toast.success(success, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(DELETEADDRESS.fulfilled, (state, action) => { 
                    const {success, addressId} = action.payload;
                    if (success) {
                        const updatedAddressList = state.shippingAddress.filter((address) => address._id !== addressId)
                        state.shippingAddress = [...updatedAddressList]
                    }
                })
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {message} = action.payload;
                    if (message) {
                        state.shippingAddress = []
                    } 
                })
                .addMatcher(
                    isFulfilled(ADDSHIPPINGADDRESS, FETCHADDRESSLIST, UPDATEADDRESS, DELETEADDRESS, LOGOUT),
                    (state) => {
                    state.status = 'success'
                }
                )
                .addMatcher(
                    isPending(ADDSHIPPINGADDRESS, UPDATEADDRESS),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(ADDSHIPPINGADDRESS, FETCHADDRESSLIST, UPDATEADDRESS, DELETEADDRESS, LOGOUT),
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


export default addressSlice.reducer