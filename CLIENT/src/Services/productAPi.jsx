import { createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptors } from "../Utils/Axios";
const axiosInstance = setupInterceptors();


const STOREPRODUCTS = createAsyncThunk('products/store-products', async (userId, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.get(`/store-all-products/${userId}`)
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const SINGLEPRODUCT = createAsyncThunk('products/single-product', async ({id, username}) => { 
    try {
        const response = await axiosInstance.get(`/product/${id}?username=${username}`) 
        return response.data
    }
    catch (err) {
        return err.message
    }
}) 

const UPLOADPRODUCT = createAsyncThunk('products/upload-product', async ({userId, newProduct}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.post(`/add-product/${userId}`, newProduct)
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const UPDATEPRODUCT = createAsyncThunk('products/update-product', async ({id, username, editProduct}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.patch(`/update-product/${id}?username=${username}`, editProduct)
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const DELETEPRODUCT = createAsyncThunk('products/delete-product', async ({id, username}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.delete(`/delete-product/${id}?username=${username}`)
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

export {
    STOREPRODUCTS,
    SINGLEPRODUCT,
    UPLOADPRODUCT,
    UPDATEPRODUCT,
    DELETEPRODUCT
}