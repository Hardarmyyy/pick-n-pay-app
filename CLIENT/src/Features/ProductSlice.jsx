import { createSlice, isPending, isFulfilled, isRejected} from "@reduxjs/toolkit";
import { STOREPRODUCTS, UPLOADPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, SINGLEPRODUCT } from "../Services/productAPi";
import { LOGOUT } from "../Services/authApi";
import {toast} from 'react-toastify'



const initialState = {
    status: 'idle',
    store: null,
    selectedProduct: null
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
                    state.store = sellersStore
                })
                .addCase(SINGLEPRODUCT.fulfilled, (state, action) => {
                    const {singleProduct} = action.payload;
                    state.selectedProduct = singleProduct
                })
                .addCase(UPLOADPRODUCT.fulfilled, (state, action) => {
                    const {success, newProduct} = action.payload
                    const product = {productId: newProduct._id, ...newProduct}
                    state.store = [product, ...state.store]
                    toast.success(success, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(UPDATEPRODUCT.fulfilled, (state, action) => {
                    const {success, updatedProduct} = action.payload
                    const currentProduct = {productId: updatedProduct._id, ...updatedProduct}

                    const updatedStore = state.store.filter((product) => product.productId !== currentProduct.productId)
                    state.store = [currentProduct, ...updatedStore]
                    toast.success(success, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(DELETEPRODUCT.fulfilled, (state, action) => {
                    const {success, productId} = action.payload
                    const newStore = state.store.filter((product) => product.productId !== productId)
                    state.store = [...newStore]
                    toast.success(success, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(LOGOUT.fulfilled, (state, action) => {
                    const {message} = action.payload;
                    if (message) {
                        state.store = []
                    }
                })
                .addMatcher(
                    isFulfilled(STOREPRODUCTS, UPLOADPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, SINGLEPRODUCT, LOGOUT),
                    (state) => {
                    state.status = 'success'
                }
                )
                .addMatcher(
                    isPending(UPLOADPRODUCT, UPDATEPRODUCT, DELETEPRODUCT),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isPending(STOREPRODUCTS, SINGLEPRODUCT),
                    (state) => {
                    state.status = 'Loading...';
                }
                )
                .addMatcher(
                    isRejected(STOREPRODUCTS, UPLOADPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, SINGLEPRODUCT, LOGOUT),
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

export default productSlice.reducer