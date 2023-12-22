import { createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptors } from "../Utils/Axios";



let store

export const injectStore = _store => {  
    store = _store
}

const FETCHREGISTEREDUSERS = createAsyncThunk('users/fetchUser', async (id) => { 
        const axiosPrivate = setupInterceptors(store);
    try {
        const response = await axiosPrivate.get(`/all-users/${id}`)
        return response.data
    }
    catch (err) {
        return err.message
    }
}) 

const SINGLEUSER = createAsyncThunk('users/singleUser', async (userId) => { 
        const axiosPrivate = setupInterceptors(store);
    try {
        const response = await axiosPrivate.get(`/user/${userId}`)
        return response.data
    }
    catch (err) {
        return err.message
    }
}) 

export {
    FETCHREGISTEREDUSERS,
    SINGLEUSER
}