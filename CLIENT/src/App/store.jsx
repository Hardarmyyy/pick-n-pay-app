import {configureStore, combineReducers} from '@reduxjs/toolkit'
//import usersReducer from '../Features/UserSlice'
import authReducer from '../Features/AuthSlice'
import categoryReducer from '../Features/CategorySlice'

const reducers = combineReducers({
    //users: usersReducer,
    auth: authReducer,
    category: categoryReducer
});



const store = configureStore({
    reducer: reducers
}) 

export default store;
