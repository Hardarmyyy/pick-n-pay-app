import { createSlice, isPending, isFulfilled, isRejected} from "@reduxjs/toolkit";
import { STOREPRODUCTS } from "../Services/productAPi";
import { LOGOUT } from "../Services/authApi";
import {toast} from 'react-toastify'



const initialState = {
    status: 'idle',
    store: []
}

export const productSlice = createSlice({ 
    name:'product',
    initialState,
    reducers: {
        
    },
    extraReducers (builder) {
        builder
                .addCase(STOREPRODUCTS.fulfilled, (state, action) => {
                    const {sellersStore} = action.payload
                    if (sellersStore) {
                        state.store = [...sellersStore]
                    }
                })
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    state.store = []
                })
                .addMatcher(
                    isFulfilled(STOREPRODUCTS,LOGOUT),
                    (state) => {
                    state.status = 'success'
                }
                )
                .addMatcher(
                    isPending(STOREPRODUCTS,LOGOUT),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(STOREPRODUCTS,LOGOUT),
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


export default productSlice.reducer