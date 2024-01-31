import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux'
import { SINGLEUSER } from '../../Services/userApi';
import { STOREPRODUCTS } from '../../Services/productAPi';
import UseLogout from '../../Hooks/Auth/Logout/UseLogout';
import { BiUserCircle } from "react-icons/bi";
import { BsBox2, BsBagHeart } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import Button from '../Button'


const UserProfile = () => {

const accessToken = useSelector((state) => state.auth?.accessToken);
const id = useSelector((state) => state.auth?.user?.userID)
const user = useSelector((state) => state.auth.user);
const seller = user && user.userRole[0] === 'seller';
const buyer = user && user.userRole[0] === 'buyer';

const {handleLogout} = UseLogout()
const dispatch = useDispatch()
const navigate = useNavigate()

const handleSignOut = async () => {
    await handleLogout()
}

const handleGoTOProfile = async () => {
    await dispatch(SINGLEUSER(id))
    .then((response) => {
        navigate('/profile')
    })
    .catch((err) => {
        console.error(err)
    })
}

const handleGoToShop = async () => {
    await dispatch(STOREPRODUCTS(id))
    .then((response) => {
        const {sellersStore} = response.payload
        if (sellersStore) {
            navigate('/shop')
        }
    })
    .catch((err) => {
        console.error(err)
    })
}


return (

<>
    <section className='w-40 h-48 absolute top-12 -left-5 z-10 text-center rounded-md py-2 shadow-sm bg-gray-200'>

        <div>

            {accessToken ? 
            
                <Button eventHandler={() => handleSignOut()} backgroundColor='crimson' margin='0px 0px 5px 0px' opacity='0.8' padding='5px 25px'> Sign out </Button>
            :
                <div className='block'>
                    <Link to='/login'> <Button backgroundColor='crimson' padding='5px 25px' opacity='0.8'> Sign in </Button> </Link>
                    <p className='text-my-primary font-Montserrat text-sm my-1'>  click <Link to='/signup' className='text-blue-600'> here </Link> to sign up</p>
                </div>
            }

        </div>

        <hr className='my-2'/>
        
        <div className='block text-sm text-my-primary font-Montserrat'>

            {user && <p className='my-1 font-medium'> Hi {user.userName} </p> }

            <Link to='#' onClick={handleGoTOProfile} className='flex justify-center rounded-sm mb-1 py-1 hover:bg-gray-400'> <BiUserCircle className='text-xl mr-2'></BiUserCircle> My Account </Link>
            
            <Link to='/orders' className='flex justify-center rounded-sm my-1 py-1 hover:bg-gray-400'> <BsBox2 className='text-xl mr-2'></BsBox2> Orders </Link>
            
            {seller 
                ? <Link to='#' onClick={handleGoToShop} className='flex justify-center rounded-sm mb-1 py-1 hover:bg-gray-400'> <RxDashboard className='text-xl mr-2'></RxDashboard> Shop </Link> 
                    :
                        <Link to='/favourites' className='flex justify-center rounded-sm mb-1 py-1 hover:bg-gray-400'> <BsBagHeart className='text-xl mr-2'></BsBagHeart> Wishlist {buyer ? <span> 10 </span> : null}</Link> 
                
            }
            
        </div>

    </section> 
</>

)
}

export default UserProfile
