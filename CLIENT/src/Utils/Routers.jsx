import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import App from '../App'
import Login from '../Pages/Auth/Login/Login.jsx'
import SignUp from '../Pages/Auth/SignUp/SignUp.jsx'
import VerifyEmail from '../Pages/Auth/VerifyEmail/VerifyEmail.jsx'
import ForgotPassword from '../Pages/Auth/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from '../Pages/Auth/ResetPassword/ResetPassword.jsx'


import PersistLogin from './PersistLogin'
import PrivateRoutes from './PrivateRoutes'
import { admin, buyer, seller, registeredUser } from './AllowedRoles'

import LandingPage from '../Pages/HomePage/LandingPage.jsx'

import ProfileLayout from '../Pages/UserProfile/ProfileLayout.jsx'
import Profile from '../Pages/UserProfile/Profile/Profile.jsx'
import UpdateProfile from '../Pages/UserProfile/UpdateProfile/UpdateProfile.jsx'
import ChangePassword from '../Pages/UserProfile/ChangePassword/ChangePassword.jsx'

import Orders from '../Pages/Orders/Orders.jsx'

import ShopLayout from '../Pages/Shop/ShopLayout.jsx'
import Dashboard from '../Pages/Shop/Dashboard/Dashboard.jsx'
import NewProduct from '../Pages/Shop/NewProduct/NewProduct.jsx'
import Products from '../Pages/Shop/Products/Products.jsx'
import UpdateProduct from '../Pages/Shop/UpdateProduct/UpdateProduct.jsx'
import ProductAdded from '../component/ProductAdded.jsx'

import FavouritesLayout from '../Pages/Favourites/FavouritesLayout.jsx'
import CartProduct from '../Pages/CartProducts/CartProduct.jsx' 
import CheckoutLayout from '../Pages/Checkout/CheckoutLayout.jsx'

import PageNotFound from '../Pages/PageNotFound/PageNotFound.jsx'
import Unauthorized from '../Pages/Unauthorized/Unauthorized.jsx'



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
            <Route path='/cart' element={<CartProduct></CartProduct>}></Route>

            <Route element={<PrivateRoutes allowedRoles={registeredUser}></PrivateRoutes>}>

                <Route path='/profile' element={<ProfileLayout></ProfileLayout>}>

                    <Route index element={<Profile></Profile>}></Route>
                    <Route path=':update-profile' element={<UpdateProfile></UpdateProfile>}></Route>
                    <Route path=':update-password' element={<ChangePassword></ChangePassword>}></Route>

                </Route>

                <Route path='/orders' element={<Orders></Orders>}></Route>

                <Route element={<PrivateRoutes allowedRoles={seller}></PrivateRoutes>}>

                    <Route path='/shop' element={<ShopLayout></ShopLayout>}>

                        <Route index element={<Dashboard></Dashboard>}></Route>
                        <Route path=':add-new-product' element={<NewProduct></NewProduct>}></Route>
                        <Route path=':all-products' element={<Products></Products>}></Route>
                        <Route path=':edit-product/:id' element={<UpdateProduct></UpdateProduct>}></Route>
                        <Route path=':product-success/:id' element={<ProductAdded></ProductAdded>}></Route>

                    </Route>

                </Route>

                <Route element={<PrivateRoutes allowedRoles={buyer}></PrivateRoutes>}>

                    <Route path='/favourites' element={<FavouritesLayout></FavouritesLayout>}></Route>
                    <Route path='/checkout' element={<CheckoutLayout></CheckoutLayout>}></Route>

                </Route>

            </Route>

        </Route>

        <Route path='/unauthorized' element={<Unauthorized></Unauthorized>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>

    </Route> 
)
)
