import { createSlice, isPending, isFulfilled, isRejected} from "@reduxjs/toolkit";
import { STOREPRODUCTS, UPLOADPRODUCT, UPDATEPRODUCT, DELETEPRODUCT } from "../Services/productAPi";
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
                .addCase(UPLOADPRODUCT.fulfilled, (state, action) => {
                    const {success, newProduct} = action.payload
                    const product = {productId: newProduct._id, title: newProduct.title, price:newProduct.price, description: newProduct.description, category: newProduct.category, brand: newProduct.brand, countInStock: newProduct.countInStock}

                    state.store = [product, ...state.store]
                    toast.success(success, {
                        toastStyle: { background: 'green', color: 'white' }
                    })
                })
                .addCase(UPDATEPRODUCT.fulfilled, (state, action) => {
                    const {success, updatedProduct} = action.payload
                    const currentProduct = {productId: updatedProduct._id, title: updatedProduct.title, price:updatedProduct.price, description: updatedProduct.description, category: updatedProduct.category, brand: updatedProduct.brand, countInStock: updatedProduct.countInStock}

                    const updateStore = state.store.filter((product) => product.productId !== currentProduct.productId)
                    state.store = [currentProduct, ...updateStore]
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
                    isFulfilled(STOREPRODUCTS, UPLOADPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, LOGOUT),
                    (state) => {
                    state.status = 'success'
                }
                )
                .addMatcher(
                    isPending(STOREPRODUCTS, UPLOADPRODUCT, UPDATEPRODUCT),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(STOREPRODUCTS, UPLOADPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, LOGOUT),
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