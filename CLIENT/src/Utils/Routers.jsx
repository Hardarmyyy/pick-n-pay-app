import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import App from '../App'
import Login from '../Pages/Auth/Login/Login.jsx'
import SignUp from '../Pages/Auth/SignUp/SignUp.jsx'
import VerifyEmail from '../Pages/Auth/VerifyEmail/VerifyEmail.jsx'
import ForgotPassword from '../Pages/Auth/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from '../Pages/Auth/ResetPassword/ResetPassword.jsx'
import PageNotFound from '../Pages/PageNotFound/PageNotFound.jsx'
import Unauthorized from '../Pages/Unauthorized/Unauthorized.jsx'

import PersistLogin from './PersistLogin'
import PrivateRoutes from './PrivateRoutes'
import { admin, buyer, seller, registeredUser } from './AllowedRoles'

import LandingPage from '../Pages/HomePage/LandingPage.jsx'
import Profile from '../Pages/UserProfile/ProfileLayout.jsx'
import Orders from '../Pages/Orders/Orders.jsx'
import ShopLayout from '../Pages/Shop/ShopLayout.jsx'
import FavouritesLayout from '../Pages/Favourites/FavouritesLayout.jsx'
import Checkout from '../Pages/CartProducts/CartProduct.jsx'



// import OrderCompleteLayout from '../Components/Pages/Checkout/OrderCompleteModal/OrderCompleteLayout'
// import ProductDetail from '../Components/Pages/ProductDetailsLayout/ProductDetail/ProductDetail'
// import ProductListings from '../Components/Pages/ProductListings/ProductListings'
// import Details from '../Components/Pages/ProductDetailsLayout/Details/Details'
// import ProductDetailsLayout from '../Components/Pages/ProductDetailsLayout/ProductDetailsLayout'
// import Store from '../Components/Pages/Shops/SellerStore/Store'
// import ProductForm from '../Components/Pages/Shops/ProductForm/ProductForm'
// import SuccessForm from '../Components/Pages/Shops/ProductForm/SuccessForm/SuccessForm'
// import EditProductForm from '../Components/Pages/Shops/ProductForm/EditProductForm/EditProductForm'
// import ProfileLayout from '../Components/Pages/Profile/ProfileLayout'
// import EditProfile from '../Components/Pages/Profile/EditProfile/EditProfile'
// import ChangePassword from '../Components/Pages/Profile/ChangePassword/ChangePassword'
// import OrderDetails from '../Components/Pages/Orders/OrderDetailsModal/OrderDetails'


export const router = createBrowserRouter(
    createRoutesFromElements(
    <Route element={<App></App>}> 

        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/verify-email' element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/reset-password' element={<ResetPassword></ResetPassword>}></Route>
        
        <Route element={<PersistLogin></PersistLogin>}>

            <Route path='/' element={<LandingPage></LandingPage>}></Route>
            <Route path='/checkout' element={<Checkout></Checkout>}></Route>

            <Route element={<PrivateRoutes allowedRoles={registeredUser}></PrivateRoutes>}>
                <Route path='/profile' element={<Profile></Profile>}></Route>
                <Route path='/orders' element={<Orders></Orders>}></Route>

                <Route element={<PrivateRoutes allowedRoles={seller}></PrivateRoutes>}>
                    <Route path='/shop' element={<ShopLayout></ShopLayout>}></Route>
                </Route>

                <Route element={<PrivateRoutes allowedRoles={buyer}></PrivateRoutes>}>
                    <Route path='/favourites' element={<FavouritesLayout></FavouritesLayout>}></Route>
                </Route>

            </Route>

        </Route>

        <Route path='/unauthorized' element={<Unauthorized></Unauthorized>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>

    </Route> 
)
)
