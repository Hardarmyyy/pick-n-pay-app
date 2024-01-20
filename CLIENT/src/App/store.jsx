import {configureStore, combineReducers} from '@reduxjs/toolkit'
// import userReducer from '../Features/UserSlice'
import authReducer from '../Features/AuthSlice'
import categoryReducer from '../Features/CategorySlice'
import cartReducer from '../Features/CartSlice'

const reducers = combineReducers({
    // user: userReducer,
    auth: authReducer,
    category: categoryReducer,
    cart: cartReducer
});



const store = configureStore({
    reducer: reducers
}) 

export default store;
