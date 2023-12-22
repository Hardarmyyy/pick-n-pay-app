import {configureStore, combineReducers} from '@reduxjs/toolkit'
//import usersReducer from '../Features/UserSlice'
import authReducer from '../Features/AuthSlice'

const reducers = combineReducers({
    //users: usersReducer,
    auth: authReducer
});



const store = configureStore({
    reducer: reducers
}) 

export default store;
