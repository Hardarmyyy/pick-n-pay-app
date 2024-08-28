import { createSlice, isPending, isFulfilled, isRejected} from "@reduxjs/toolkit";
import { GETSELLERORDER, GETBUYERORDER } from "../Services/orderApi";
import { LOGOUT } from "../Services/authApi";
import {toast} from 'react-toastify';

const initialState = {
    status: 'idle',
    orderHistory: null,
    singleOrder: null
}


export const orderSlice = createSlice({ 
    name:'order',
    initialState,
    reducers: {

    },
    extraReducers (builder) {
        builder
                .addCase(GETSELLERORDER.fulfilled, (state, action) => { 
                    const {orderHistory} = action.payload
                    state.orderHistory = orderHistory
                })
                .addCase(GETBUYERORDER.fulfilled, (state, action) => { 
                    const {orderHistory} = action.payload
                    state.orderHistory = orderHistory
                })
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {message} = action.payload;
                    if (message) {
                        state.orderHistory = null
                    }
                })
                .addMatcher(
                    isFulfilled(GETSELLERORDER, GETBUYERORDER, LOGOUT),
                    (state) => {
                    state.status = 'success'
                }
                )
                // .addMatcher(
                //     isPending(_),
                //     (state) => {
                //     state.status = 'Loading.......';
                // }
                // )
                .addMatcher(
                    isPending(GETSELLERORDER, GETBUYERORDER),
                    (state) => {
                    state.status = 'Loading...';
                }
                )
                .addMatcher(
                    isRejected(GETSELLERORDER, GETBUYERORDER, LOGOUT),
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

export default orderSlice.reducer