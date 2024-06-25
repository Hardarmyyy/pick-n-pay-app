import React from 'react'
import {Link} from 'react-router-dom';
import {useSelector } from 'react-redux'
import UseLogout from '../../Hooks/Auth/Logout/UseLogout';
import { BiUserCircle } from "react-icons/bi";
import { BsBox2, BsBagHeart } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import Button from '../Button'


const UserProfile = ({onProfileClick}) => {

const accessToken = useSelector((state) => state.auth?.accessToken);
const user = useSelector((state) => state.auth.user);
const seller = user && user.userRole[0] === 'seller';
const buyer = user && user.userRole[0] === 'buyer';

const {handleLogout} = UseLogout()

const handleSignOut = async () => {
    await handleLogout()
}



return (

<>
    <section className='w-40 h-48 absolute top-12 -left-5 z-10 text-center rounded-md py-2 shadow-sm bg-gray-200' onClick={onProfileClick}>

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

            <Link to='/profile' className='flex justify-center items-center px-3 rounded-sm mb-1 py-1 hover:bg-gray-400'> 
                <BiUserCircle className='text-xl flex-shrink-0'></BiUserCircle> 
                <span className='flex-1'> My Profile </span>
            </Link>
            
            <Link to='/orders' className='flex justify-center items-center px-3 rounded-sm my-1 py-1 hover:bg-gray-400'> 
                <BsBox2 className='text-xl flex-shrink-0'></BsBox2> 
                <span className='flex-1'> Orders </span>
            </Link>
            
            {seller 
                ? 
                    <Link to='/shop' className='flex justify-center items-center rounded-sm px-3 mb-1 py-1 hover:bg-gray-400'> 
                        <RxDashboard className='text-xl flex-shrink-0'></RxDashboard> 
                        <span className='flex-1'> Shop </span>
                    </Link> 
                        :
                            <Link to='/favourites' className='flex justify-center rounded-sm px-3 mb-1 py-1 hover:bg-gray-400'> 
                                <BsBagHeart className='text-xl flex-shrink-0'></BsBagHeart> 
                                <span className='flex-1'> Wishlist {buyer ? <span> 10 </span> : null} </span>
                            </Link> 
                
            }
            
        </div>

    </section> 
</>

)
}

export default UserProfile
