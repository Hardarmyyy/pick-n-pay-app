import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../Utils/Axios";



const REGISTERUSERS = createAsyncThunk('auth/register', async (initialUser, { rejectWithValue }) => { // initialUser will be the body of the post request;
    try {
        const response = await axiosInstance.post('/signup', initialUser)
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
})

const VERIFYEMAILTOKEN = createAsyncThunk('auth/verify-email-token', async ({token, email}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.get(`/verify-email-token`, {params: {token, email}})
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
})

const VERIFYEMAIL = createAsyncThunk('auth/verify-email', async ({token, Otp}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.post(`/verify`, Otp, {params: {token}} )
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
})

const FORGOTPASSWORD = createAsyncThunk('auth/forgot', async (email, { rejectWithValue }) => { // email will be the body of the post request;
    try {
        const response = await axiosInstance.post('/forgot', email)
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
})

const LOGIN = createAsyncThunk('auth/signin', async (regUser, { rejectWithValue }) => { // regUser will be the body of the post request;
    try {
        const response = await axiosInstance.post('/login', regUser)
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
})

const VERIFYRESETTOKEN = createAsyncThunk('auth/verify-reset-token', async ({token, email}, { rejectWithValue }) => { 
    try {
        const response = await axiosInstance.get(`/verify-reset-token?token=${token}&email=${email}`)
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
})

const RESETPASSWORD = createAsyncThunk('auth/reset', async ({user, token}, { rejectWithValue }) => { // token will be the query parameter AND user will be the body of the post request; 
    try {
        const response = await axiosInstance.post(`/reset?token=${token}`, user)
        return response.data
    }
    catch (err) {
        if (!err.response) {
            return rejectWithValue({ error: "Unable to connect to the server" });
        }
        return rejectWithValue(err.response.data);
    }
})

const REFRESH = createAsyncThunk('auth/refresh', async () => { 
    try {
        const response = await axiosInstance.get('/refresh')
        return response.data
    }
    catch (err) {
        return err.message
    }
})

const LOGOUT = createAsyncThunk('auth/logout', async () => { 
    try {
        const response = await axiosInstance.get('/logout')
        return response.data
    }
    catch (err) {
        return err.message
    }
})

export {
    REGISTERUSERS, 
    VERIFYEMAILTOKEN,
    VERIFYEMAIL,
    LOGIN,
    FORGOTPASSWORD,
    VERIFYRESETTOKEN,
    RESETPASSWORD,
    REFRESH,
    LOGOUT
}  
