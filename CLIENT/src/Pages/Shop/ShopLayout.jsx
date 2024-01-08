import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom'
import Navigation from '../../Layouts/Navigation/Navigation';
// import Dashboard from '../../Components/Pages/Shops/Dashboard/Dashboard';
import './Shop.css'



const ShopLayout = () => {

// define a state to show and hide the useProfile card;
const [active, setActive] = useState(false)  

return (

<>
    
    <Navigation></Navigation>

    <section className='shop'>

        <div className='shopLinks'>
            <Link to='/post-product'> <p> Add new product </p>  </Link>
            <Link to='/shop/all-products'> <p> All products </p> </Link>
        </div>

        {/* <Dashboard></Dashboard> */}

    </section>


    <Outlet></Outlet>
</>

)
}

export default ShopLayout