import { createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptors } from "../Utils/Axios";
const axiosInstance = setupInterceptors();



const ADDSHIPPINGADDRESS = createAsyncThunk('address/create-address', async ({userId, deliveryInfo}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.post(`/add-shipping-address/${userId}`, deliveryInfo)
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
}) 

const FETCHADDRESSLIST = createAsyncThunk('address/all-address', async (userId) => { 
    try {
        const response = await axiosInstance.get(`/all-shipping-address/${userId}`)
        return response.data
    }
    catch (err) {
        return err.message;
    }
}) 

const UPDATEADDRESS = createAsyncThunk('address/update-address', async ({id, username, deliveryInfo}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.patch(`/edit-shipping-address/${id}?username=${username}`, deliveryInfo)
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
}) 

const DELETEADDRESS = createAsyncThunk('address/delete-address', async ({id, username}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.delete(`/delete-shipping-address/${id}?username=${username}`)
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
}) 

export {
    ADDSHIPPINGADDRESS,
    FETCHADDRESSLIST,
    UPDATEADDRESS,
    DELETEADDRESS
}