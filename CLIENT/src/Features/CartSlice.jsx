import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import {FETCHCARTITEMS} from '../Services/cartApi'


export const initialState = {
    status: 'idle',
    cartItems: []
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
    
    },
    extraReducers (builder) {
        builder 
                .addCase(FETCHCARTITEMS.fulfilled, (state, action) => { 
                    const cart = action.payload.cart
                    
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
                        const message = action.payload.error
                        toast.error(message, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                }
                )
    }
})


export default cartSlice.reducer