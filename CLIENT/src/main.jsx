import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import UserContextProvider from './Utilities/UserContext.jsx'
import ProductContextProvider from './Utilities/ProductContext.jsx'

import Checkout from "./Components/Pages/Checkout/Checkout"
import NotFound from "./Components/Pages/NotFound/NotFound"
import PrivatesRoutes from './Utilities/PrivateRoutes.jsx'
import Login from './Components/Pages/Login/Login.jsx'
import SignUp from './Components/Pages/SignUp/SignUp.jsx'
import OrderCompleteLayout from './Components/Pages/Checkout/OrderCompleteModal/OrderCompleteLayout.jsx'
import LandingPage from './Components/Pages/LandingPage/LandingPage.jsx'
import ProductDetail from './Components/Pages/ProductDetailsLayout/ProductDetail/ProductDetail.jsx'
import Details from './Components/Pages/ProductDetailsLayout/Details/Details.jsx'
import ProductDetailsLayout from './Components/Pages/ProductDetailsLayout/ProductDetailsLayout.jsx' 
import ShopLayout from './Components/Pages/shops/shopLayout.jsx'
import ProductForm from './Components/Pages/shops/ProductForm/ProductForm.jsx'
import SuccessForm from './Components/Pages/shops/ProductForm/SuccessForm/SuccessForm.jsx'
import EditProductForm from './Components/Pages/shops/ProductForm/EditProductForm/EditProductForm.jsx'
import ProfileLayout from './Components/Pages/Profile/ProfileLayout.jsx'
import Profile from './Components/Pages/Profile/Profile.jsx'
import EditProfile from './Components/Pages/Profile/EditProfile/EditProfile.jsx'
import ChangePassword from './Components/Pages/Profile/ChangePassword/ChangePassword.jsx'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App></App>}>

      <Route path='/' element={<LandingPage></LandingPage>}></Route>

      <Route path='/category/:type' element={<ProductDetailsLayout></ProductDetailsLayout>}>

        <Route index element={<ProductDetail></ProductDetail>}></Route>

        <Route path='/category/:type/:id' element={<Details></Details>}></Route>

      </Route>

      <Route path='/checkout' element={<Checkout></Checkout>}></Route>

      <Route  element={<PrivatesRoutes></PrivatesRoutes>}>

        <Route path='/orderCompleted' element={<OrderCompleteLayout></OrderCompleteLayout>}></Route>

      </Route>

      <Route path='/shop' element={<ShopLayout></ShopLayout>}></Route>

      <Route path='/post-product' element={<ProductForm></ProductForm>}></Route>

      <Route path='/product-success' element={<SuccessForm></SuccessForm>}></Route>

      <Route path='/update-product/:id' element={<EditProductForm></EditProductForm>}></Route>

      <Route path='/profile' element={<ProfileLayout></ProfileLayout>}>

        <Route index element={<Profile></Profile>}></Route>

        <Route path='/profile/edit/:username' element={<EditProfile></EditProfile>}></Route>

        <Route path='/profile/update-password/:username' element={<ChangePassword></ChangePassword>}></Route>

      </Route>

      <Route path='/login' element={<Login></Login>}></Route>

      <Route path='/signup' element={<SignUp></SignUp>}></Route>

      <Route path='*' element={<NotFound></NotFound>}></Route> 

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <ProductContextProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ProductContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
