import { createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptors } from "../Utils/Axios";



let store

export const injectStore = _store => {  
    store = _store
}

const SINGLEUSER = createAsyncThunk('users/singleUser', async (id) => { 
        const axiosPrivate = setupInterceptors(store);
    try {
        const response = await axiosPrivate.get(`/user/${id}`)
        return response.data
    }
    catch (err) {
        return err.message
    }
}) 

export {
    SINGLEUSER
}