import { lazy, Suspense } from 'react'
import Spinner from '../component/Spinner.jsx'

import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
const App = lazy(() => import ('../App')) 
const Login = lazy(() => import ('../Pages/Auth/Login/Login.jsx')) 
const SignUp = lazy(() => import ('../Pages/Auth/SignUp/SignUp.jsx')) 
const VerifyEmail = lazy(() => import ('../Pages/Auth/VerifyEmail/VerifyEmail.jsx'))
const ForgotPassword = lazy(() => import ('../Pages/Auth/ForgotPassword/ForgotPassword.jsx'))
const ResetPassword = lazy(() => import ('../Pages/Auth/ResetPassword/ResetPassword.jsx'))


const PersistLogin = lazy(() => import ('./PersistLogin'))
import PrivateRoutes from './PrivateRoutes'
import { admin, buyer, seller, registeredUser } from './AllowedRoles'

const LandingPage = lazy(() => import ('../Pages/HomePage/LandingPage.jsx'))
const CartProduct  = lazy(() => import ('../Pages/CartProducts/CartProduct.jsx' )) 
const CategoryProduct = lazy(() => import ('../Pages/Products/CategoryProducts/CategoryProduct.jsx'))

const ProfileLayout = lazy(() => import ('../Pages/UserProfile/ProfileLayout.jsx'))
import Profile from '../Pages/UserProfile/Profile/Profile.jsx'
import UpdateProfile from '../Pages/UserProfile/UpdateProfile/UpdateProfile.jsx'
import ChangePassword from '../Pages/UserProfile/ChangePassword/ChangePassword.jsx'

const Orders = lazy(() => import ('../Pages/Orders/Orders.jsx'))

const ShopLayout = lazy(() => import ('../Pages/Shop/ShopLayout.jsx'))
import Dashboard from '../Pages/Shop/Dashboard/Dashboard.jsx'
import NewProduct from '../Pages/Shop/NewProduct/NewProduct.jsx'
import Products from '../Pages/Shop/Products/Products.jsx'
import UpdateProduct from '../Pages/Shop/UpdateProduct/UpdateProduct.jsx'

const FavouritesLayout = lazy(() => import ('../Pages/Favourites/FavouritesLayout.jsx'))
const CheckoutLayout = lazy(() => import ('../Pages/Checkout/CheckoutLayout.jsx'))

const AddressLayout = lazy(() => import ('../Pages/ShippingAddress/AddressLayout.jsx'))
import AddShipping from '../Pages/ShippingAddress/AddShipping.jsx'
import UpdateShipping from '../Pages/ShippingAddress/UpdateShipping.jsx'

import PageNotFound from '../Pages/PageNotFound/PageNotFound.jsx'
import Unauthorized from '../Pages/Unauthorized/Unauthorized.jsx'



export const router = createBrowserRouter(
    createRoutesFromElements(
    <Route  element={ <Suspense fallback={<div className='loader'> <Spinner></Spinner> </div>}> <App></App> </Suspense> }> 

        <Route path='/login' element={<Suspense fallback={<div className='loader'> <Spinner></Spinner> </div>}> <Login></Login> </Suspense>}></Route>
        <Route path='/signup' element={<Suspense fallback={ <div className='loader'> <Spinner></Spinner> </div>}> <SignUp></SignUp> </Suspense>}></Route>
        <Route path='/verify-email' element={<Suspense fallback={<div className='loader'> <Spinner></Spinner> </div>}> <VerifyEmail></VerifyEmail> </Suspense>}></Route>
        <Route path='/forgot-password' element={<Suspense fallback={<div className='loader'> <Spinner></Spinner> </div>}> <ForgotPassword></ForgotPassword> </Suspense>}></Route>
        <Route path='/reset-password' element={<Suspense fallback={<div className='loader'> <Spinner></Spinner> </div>}> <ResetPassword></ResetPassword> </Suspense>}></Route>
        
        <Route element={ <PersistLogin></PersistLogin> }>

            <Route path='/' element={ <LandingPage></LandingPage> }></Route>
            <Route path='/cart' element={ <CartProduct></CartProduct> }></Route>
            <Route path='/category/:category' element={ <CategoryProduct></CategoryProduct> }></Route>

            <Route element={<PrivateRoutes allowedRoles={registeredUser}></PrivateRoutes>}>

                <Route path='/profile' element={ <ProfileLayout></ProfileLayout> }>

                    <Route index element={<Profile></Profile>}></Route>
                    <Route path='update-profile' element={<UpdateProfile></UpdateProfile>}></Route>
                    <Route path='update-password' element={<ChangePassword></ChangePassword>}></Route>

                </Route>

                <Route path='/orders' element={ <Orders></Orders> }></Route>

                <Route element={<PrivateRoutes allowedRoles={seller}></PrivateRoutes>}>

                    <Route path='/shop' element={ <ShopLayout></ShopLayout> }>

                        <Route index element={<Dashboard></Dashboard>}></Route>
                        <Route path='add-new-product' element={<NewProduct></NewProduct>}></Route>
                        <Route path='all-products' element={<Products></Products>}></Route>
                        <Route path='edit-product/:id' element={<UpdateProduct></UpdateProduct>}></Route>

                    </Route>

                </Route>

                <Route element={<PrivateRoutes allowedRoles={buyer}></PrivateRoutes>}>

                    <Route path='/favourites' element={ <FavouritesLayout></FavouritesLayout> }></Route>
                    <Route path='/checkout' element={ <CheckoutLayout></CheckoutLayout> }></Route>

                    <Route path='/shipping-address' element={ <AddressLayout></AddressLayout> }>
                        <Route index element={<AddShipping></AddShipping>}></Route>
                        <Route path='update/:id' element={<UpdateShipping></UpdateShipping>}></Route>
                    </Route>
                    
                </Route>

            </Route>

            <Route path='/unauthorized' element={<Unauthorized></Unauthorized>}></Route>
            <Route path='*' element={<PageNotFound></PageNotFound>}></Route>

        </Route>

    </Route> 
)
)
