import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../Utils/Axios";

const FETCHALLCATEGORIES = createAsyncThunk('category/all', async () => { 
    try {
        const response = await axiosInstance.get('/all-categories')
        return response.data
    }
    catch (err) {
        return err.message
    }
})

export {
    FETCHALLCATEGORIES
}

