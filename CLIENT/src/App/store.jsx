import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from '../Features/UserSlice'
import authReducer from '../Features/AuthSlice'
import categoryReducer from '../Features/CategorySlice'
import cartReducer from '../Features/CartSlice'
import productReducer from '../Features/ProductSlice'
import addressReducer from '../Features/AddressSlice'

const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    cart: cartReducer,
    product: productReducer,
    address: addressReducer
});



const store = configureStore({
    reducer: reducers
}) 

export default store;
