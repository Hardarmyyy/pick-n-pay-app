import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../Utils/Axios";

const FETCHCARTITEMS = createAsyncThunk('cart/all', async () => { 
    try {
        const response = await axiosInstance.get('/all-cart-products')
        return response.data
    }
    catch (err) {
        return err.message
    }
})

export {
    FETCHCARTITEMS
}

