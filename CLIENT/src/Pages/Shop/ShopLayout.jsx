import { useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom'
import Modal from '../../component/Modal';
import Spinner from '../../component/Spinner';
import UseFetchStore from '../../Hooks/Shop/UseFetchStore';


const ShopLayout = () => {

const {shopStatus} = UseFetchStore(); 


return (

<>
    {shopStatus === 'Loading.......' && <Modal> <Spinner></Spinner> </Modal>}

    <section className='w-full min-h-[70vh] py-6 sm:px-2 md:px-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex justify-center items-start'>

        <div className='sm:hidden md:hidden tablet:w-1/5 mini:w-36 laptop:w-44 super:w-44 min-h-[100vh] py-3 text-sm bg-gray-200 rounded-md shadow-sm text-my-primary font-Montserrat'>
            <p className='mb-2 tablet:ms-3 mini:ms-3 laptop:ms-5  super:ms-5'>
                <NavLink className={({ isActive }) => isActive ? "" : null} to={`/shop`}>  store  </NavLink>
            </p>
            <p className='mb-2 tablet:ms-3 mini:ms-3 laptop:ms-5  super:ms-5'>
                <NavLink className={({ isActive }) => isActive ? "" : null} to={`/shop/add-new-product`}>  new product  </NavLink>
            </p>
            <p className='mb-2 tablet:ms-3 mini:ms-3 laptop:ms-5  super:ms-5'>
                <NavLink className={({ isActive }) => isActive ? "" : null} to={`/shop/all-products`}>  Products  </NavLink>
            </p>

        </div>

        <Outlet></Outlet>

    </section>


</>

)
}

export default ShopLayout