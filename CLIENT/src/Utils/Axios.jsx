import axios from 'axios';
import { REFRESH } from '../Services/authApi';



// create an axios instance
export const axiosInstance = axios.create({ 
    baseURL: import.meta.env.VITE_API_URI,
    headers: {'Content-Type' : 'application/json'},
    withCredentials: true,  // set withCredentials to true to get req cookies
});

// create a setupInterceptors for requests headers and authourization
export const setupInterceptors = (store) => {

    const axiosPrivate = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });

    axiosPrivate.interceptors.request.use(
        (config) => {
        const accessToken = store.getState().auth.accessToken;
        if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
        },
        (error) => {
        return Promise.reject(error);
        }
    );

    axiosPrivate.interceptors.response.use(
        (response) => {
        return response;
        },
        async (error) => {
            const originalRequest = error?.config;

        if (error?.response && error?.response?.status === 403 && !originalRequest?.sent) {
            originalRequest.sent = true;
            await store.dispatch(REFRESH());
            const newAccessToken = store.getState().auth.accessToken;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosPrivate(originalRequest);
        }
        else if (error?.response && error?.response?.status === 403 && originalRequest?.sent) {
            window.location.replace('/login')
            return Promise.reject(err);
        }

        return Promise.reject(error);
        }
    );

    return axiosPrivate;

}






