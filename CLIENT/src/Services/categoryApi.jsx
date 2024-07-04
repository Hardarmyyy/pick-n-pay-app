import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../Utils/Axios";

const FETCHALLCATEGORIES = createAsyncThunk('category/all', async (_, {rejectWithValue}) => { 
    try {
        const response = await axiosInstance.get('/all-categories')
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
})

const CATEGORYPRODUCTS = createAsyncThunk('category/products', async (category, {rejectWithValue}) => { 
    try {
        const response = await axiosInstance.get(`all-products-category`, {params: {category}})
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
    FETCHALLCATEGORIES,
    CATEGORYPRODUCTS
}

