import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import App from '../App'
import Login from '../Pages/Login/Login.jsx'
import SignUp from '../Pages/SignUp/SignUp.jsx'
import VerifyEmail from '../Pages/VerifyEmail/VerifyEmail.jsx'
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from '../Pages/ResetPassword/ResetPassword.jsx'
import PageNotFound from '../Pages/PageNotFound/PageNotFound.jsx'

import LandingPage from '../Pages/HomePage/LandingPage.jsx'

// import Checkout from '../Components/Pages/Checkout/Checkout'
// import NotFound from '../Components/Pages/NotFound/NotFound'
// import OrderCompleteLayout from '../Components/Pages/Checkout/OrderCompleteModal/OrderCompleteLayout'
// import ProductDetail from '../Components/Pages/ProductDetailsLayout/ProductDetail/ProductDetail'
// import ProductListings from '../Components/Pages/ProductListings/ProductListings'
// import Details from '../Components/Pages/ProductDetailsLayout/Details/Details'
// import ProductDetailsLayout from '../Components/Pages/ProductDetailsLayout/ProductDetailsLayout'
// import ShopLayout from '../Components/Pages/Shops/ShopLayout'
// import Store from '../Components/Pages/Shops/SellerStore/Store'
// import ProductForm from '../Components/Pages/Shops/ProductForm/ProductForm'
// import SuccessForm from '../Components/Pages/Shops/ProductForm/SuccessForm/SuccessForm'
// import EditProductForm from '../Components/Pages/Shops/ProductForm/EditProductForm/EditProductForm'
// import ProfileLayout from '../Components/Pages/Profile/ProfileLayout'
// import EditProfile from '../Components/Pages/Profile/EditProfile/EditProfile'
// import Profile from '../Components/Pages/Profile/Profile'
// import ChangePassword from '../Components/Pages/Profile/ChangePassword/ChangePassword'
// import FavouritesLayout from '../Components/Pages/Favourites/FavouritesLayout'
// import Orders from '../Components/Pages/Orders/Orders'
// import OrderDetails from '../Components/Pages/Orders/OrderDetailsModal/OrderDetails'

import PrivateRoutes from './PrivateRoutes'
import { admin, registeredUser } from './AllowedRoles'

import PersistLogin from './PersistLogin'


export const router = createBrowserRouter(
    createRoutesFromElements(
    <Route element={<App></App>}> 

    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/signup' element={<SignUp></SignUp>}></Route>
    <Route path='/verify-email' element={<VerifyEmail></VerifyEmail>}></Route>
    <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
    <Route path='/reset-password' element={<ResetPassword></ResetPassword>}></Route>
    
    <Route path='/' element={<LandingPage></LandingPage>}></Route>

    <Route path='*' element={<PageNotFound></PageNotFound>}></Route>

    </Route> 
)
)
