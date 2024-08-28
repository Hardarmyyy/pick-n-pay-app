import { createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptors } from "../Utils/Axios";
const axiosInstance = setupInterceptors();

const GETSELLERORDER = createAsyncThunk('orders/seller', async (userId, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.get(`/orders-seller/${userId}`)
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const GETBUYERORDER = createAsyncThunk('orders/buyer', async (userId, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.get(`/orders-buyer/${userId}`)
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

export {
    GETSELLERORDER,
    GETBUYERORDER
}