import { createAsyncThunk } from "@reduxjs/toolkit";
import { setupInterceptors } from "../Utils/Axios";
const axiosInstance = setupInterceptors();



const SINGLEUSER = createAsyncThunk('users/singleUser', async (id) => { 
    try {
        const response = await axiosInstance.get(`/user/${id}`)
        return response.data
    }
    catch (err) {
        return err.message
    }
}) 

const UPDATEUSERPROFILE = createAsyncThunk('users/update-profile', async ({id, updateProfile}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.patch(`/edit-profile/${id}`, updateProfile )
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const UPDATEPASSWORD = createAsyncThunk('users/update-password', async ({id, updatePassword}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.patch(`/password/${id}`, updatePassword )
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const DELETEUSER = createAsyncThunk('users/delete-user', async (id, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.delete(`/delete/${id}` )
        return response.data
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
}) 

const SWICTHPROFILE = createAsyncThunk('users/swicth-profile', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch(`/switch-role/${id}`)
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