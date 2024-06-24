import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../Utils/Axios";

const FETCHCARTITEMS = createAsyncThunk('cart/all', async (_, {rejectWithValue}) => { 
    try {
        const response = await axiosInstance.get('/all-cart-products')
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
    FETCHCARTITEMS
}

