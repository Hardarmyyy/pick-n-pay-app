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

const UPDATEUSERPROFILE = createAsyncThunk('users/update-profile', async ({id, updateProfile}, { rejectWithValue }) => { 
        const axiosPrivate = setupInterceptors(store);
    try {
        const response = await axiosPrivate.patch(`/edit-profile/${id}`, updateProfile )
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const UPDATEPASSWORD = createAsyncThunk('users/update-password', async ({id, updatePassword}, { rejectWithValue }) => { 
        const axiosPrivate = setupInterceptors(store);
    try {
        const response = await axiosPrivate.patch(`/password/${id}`, updatePassword )
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const DELETEUSER = createAsyncThunk('users/delete-user', async (id, { rejectWithValue }) => { 
        const axiosPrivate = setupInterceptors(store);
    try {
        const response = await axiosPrivate.delete(`/delete/${id}` )
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const SWICTHPROFILE = createAsyncThunk('users/swicth-profile', async (id, { rejectWithValue }) => { 
    const axiosPrivate = setupInterceptors(store);
    try {
        const response = await axiosPrivate.patch(`/switch-role/${id}`)
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

export {
    SINGLEUSER,
    UPDATEUSERPROFILE,
    UPDATEPASSWORD,
    DELETEUSER,
    SWICTHPROFILE
}