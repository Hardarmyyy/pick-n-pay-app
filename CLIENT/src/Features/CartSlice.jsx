import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import {FETCHCARTITEMS} from '../Services/cartApi'
import { LOGOUT } from "../Services/authApi";
import {toast} from 'react-toastify'


export const initialState = {
    status: 'idle',
    cartItems: {
        myCart: [],
        numberOfProducts: 0,
        subTotal: 0,
        shippingCost: 0,
        vat: 0,
        total: 0
    },
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
    
    },
    extraReducers (builder) {
        builder 
                .addCase(FETCHCARTITEMS.fulfilled, (state, action) => { 
                    state.cartItems = action.payload.cart
                })
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {message} = action.payload;
                    if (message) {
                        state.cartItems = []
                    } 
                })
                .addMatcher(
                    isFulfilled(FETCHCARTITEMS),
                    (state) => {
                    state.status = 'success'
                }
                )
                .addMatcher(
                    isPending(FETCHCARTITEMS),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(FETCHCARTITEMS),
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


export default cartSlice.reducer