import axios from 'axios';
import { REFRESH } from '../Services/authApi';


let store

export const injectStore = _store => {  
    store = _store
}


// create an axios instance
export const axiosInstance = axios.create({ 
    baseURL: import.meta.env.VITE_API_URI,
    headers: {'Content-Type' : 'application/json'},
    withCredentials: true,  // set withCredentials to true to get req cookies
});

// create a setupInterceptors for requests headers and authourization
export const setupInterceptors = () => {

    axiosInstance.interceptors.request.use(
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

    axiosInstance.interceptors.response.use(
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
            return axiosInstance(originalRequest);
        }
        else if (error?.response && error?.response?.status === 403 && originalRequest?.sent) {
            window.location.replace('/login')
            return Promise.reject(err);
        }
        // else if (error?.response && error?.response?.status === 401 && originalRequest?.sent) {
        //     window.location.replace('/login')
        //     return Promise.reject(err);
        // }

        return Promise.reject(error);
        }
    );

    return axiosInstance;

}






