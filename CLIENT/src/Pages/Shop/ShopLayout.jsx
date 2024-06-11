import { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { STOREPRODUCTS } from '../../Services/productAPi';
import Navigation from '../../Layouts/Navigation/Navigation';
import { ToastContainer } from 'react-toastify'



const ShopLayout = () => {

const dispatch = useDispatch()
const userId = useSelector((state) => state.auth?.user?.userID)

useEffect(() => {
    dispatch(STOREPRODUCTS(userId))
}, [dispatch]);


return (

<>
    
    <ToastContainer 
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
    />

    <Navigation></Navigation>

    <section className='min-w-full h-auto px-6 flex'>

        <div className='w-40 h-96 py-3 bg-gray-200 rounded-md md:text-sm lg:text-lg shadow-sm text-center text-my-primary font-Montserrat sticky top-0'>

            <p className='my-1 py-1'> <NavLink className={({ isActive }) => isActive ? "py-1 px-3 mb-2 bg-gray-400 rounded-sm" : null}  to='/shop/add-new-product'> new product </NavLink> </p>
            <p className='my-1 py-1'> <NavLink className={({ isActive }) => isActive ? "py-1 px-4 mb-2 bg-gray-400 rounded-sm" : null} to='/shop/all-products'> Products </NavLink> </p>

        </div>

        <Outlet></Outlet>

    </section>


</>

)
}

export default ShopLayout