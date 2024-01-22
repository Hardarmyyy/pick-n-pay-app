import { createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptors } from "../Utils/Axios";
const axiosInstance = setupInterceptors();



const STOREPRODUCTS = createAsyncThunk('products/store-products', async (userId) => { 
try {
    const response = await axiosInstance.get(`/store-all-products/${userId}`)
    return response.data
}
catch (err) {
    return err.message
}
}) 

export {
    STOREPRODUCTS
}