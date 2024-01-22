import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom'
import Navigation from '../../Layouts/Navigation/Navigation';
import { ToastContainer } from 'react-toastify'




const ShopLayout = () => {


return (

<>
    
    <ToastContainer 
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
    />

    <Navigation></Navigation>

    <section className='min-w-full h-auto px-6 flex'>

        <div className='w-40 h-96 py-4 bg-gray-200 rounded-md md:text-sm lg:text-lg shadow-sm text-center text-my-primary font-Montserrat'>

            <p className='my-1 py-1'> <NavLink to='/shop/add-new-product'> new product </NavLink> </p>
            <p className='my-1 py-1'> <NavLink to='/shop/all-products'> Products </NavLink> </p>

        </div>

        <Outlet></Outlet>

    </section>


</>

)
}

export default ShopLayout