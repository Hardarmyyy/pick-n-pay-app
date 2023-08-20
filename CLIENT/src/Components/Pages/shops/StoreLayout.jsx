import { Outlet, Link } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { useState } from 'react';
import UserProfile from '../Navigation/UserProfileCard/UserProfile';
import '../shops/Shop.css'
import Dashboard from './Dashboard/Dashboard';


const StoreLayout = () => {

// define a state to show and hide the useProfile card;
const [active, setActive] = useState(false)  


return (

<>
    <nav className='navigation'> 

        <div className='logo'>

            <Link to='/'> <h1> Pick<span className='colored'>N</span>Pay </h1> </Link> 

        </div>

        <div className='userProfile' > 
                <div  className='account' onClick={() => setActive(!active)}> 
                    <BiUserCircle className='userIcon'></BiUserCircle>
                    <span> Account {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> } </span> 
                </div>
        </div>

        {active ? <UserProfile></UserProfile> : null}

    </nav>

    <section className='shop'>

        <div className='shopLinks'>
            <Link to='/post-product'> <p> Add new product </p>  </Link>
            <Link to='/shop/all-products'> <p> All products </p> </Link>
        </div>

        <Dashboard></Dashboard>

    </section>


    <Outlet></Outlet>
</>
)
}

export default StoreLayout