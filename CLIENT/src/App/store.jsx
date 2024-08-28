import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from '../Features/UserSlice'
import authReducer from '../Features/AuthSlice'
import categoryReducer from '../Features/CategorySlice'
import cartReducer from '../Features/CartSlice'
import productReducer from '../Features/ProductSlice'
import addressReducer from '../Features/AddressSlice'
import orderReducer from '../Features/OrderSlice'
import { FETCHALLCATEGORIES } from '../Services/categoryApi'
import { STOREPRODUCTS } from '../Services/productAPi'
import { GETSELLERORDER, GETBUYERORDER } from '../Services/orderApi'
import { injectStore } from '../Utils/Axios'
import { decodeToken } from '../Utils/DecodeJwt'

const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    cart: cartReducer,
    product: productReducer,
    address: addressReducer,
    order: orderReducer
});

// Define and initial middleware when application loads;
const initializationMiddleware = (store) => (next) => (action) => {
    if (action.type === 'auth/signin/fulfilled' || action.type === 'auth/refresh/fulfilled' || action.type === 'users/swicth-profile/fulfilled') { 

        if (action.payload.token) {
            const user = decodeToken(action.payload.token);
            const userId = user?.userId;
            const userRole = user.userRole[0];

            if (userRole === 'seller' && userId) {
                store.dispatch(STOREPRODUCTS(userId));
                store.dispatch(GETSELLERORDER(userId));
            } else if (userRole === 'buyer' && userId) {
                store.dispatch(GETBUYERORDER(userId));
            }
        }
    }

    return next(action);
};


const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(initializationMiddleware),
}) 


injectStore(store) // inject store is used to provide the store for the axios private;

store.dispatch(FETCHALLCATEGORIES()) // fetch all categories when application loads


export default store; 
