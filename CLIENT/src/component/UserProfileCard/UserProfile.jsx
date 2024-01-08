import React from 'react'
import {Link} from 'react-router-dom';
import {useSelector } from 'react-redux'
import UseLogout from '../../Hooks/Auth/Logout/UseLogout';
import { BiUserCircle } from "react-icons/bi";
import { BsBox2, BsBagHeart } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import Button from '../Button'
import './UserProfile.css'


const UserProfile = () => {

const {handleLogout} = UseLogout()


const handleSignOut = async () => {
    await handleLogout()
}

const accessToken = useSelector((state) => state.auth.accessToken)
const user = useSelector((state) => state.auth.user)



return (

<>
    <section className='profileContainer'>

        <div className='authUser'>

            {accessToken ? 
            
                <Button eventHandler={() => handleSignOut()} backgroundColor='crimson' margin='0px 0px 5px 0px' opacity='0.8' padding='5px 25px'> Sign out </Button>
            :
                <>
                    <Link to='/login'> <Button backgroundColor='crimson' padding='5px 25px' opacity='0.8'> Sign in </Button> </Link>
                    <p> or click <Link to='/signup'> here </Link> to sign up</p>
                </>
            }

        </div>
        
        {!user && 
            <div className='userInfo'>
                <Link to='/profile'> <BiUserCircle className='Icon'></BiUserCircle> My Account </Link> 
                <Link to='/orders'> <BsBox2 className='Icon'></BsBox2> Orders </Link> 
                <Link to='/favourites'> <BsBagHeart className='Icon'></BsBagHeart> Wishlist <span> 0 </span></Link>
            </div>
        }
        
        {user &&
            <div className='userInfo'>

                <p className='user'> Hi {user.username} </p>

                <Link to='/profile'> <BiUserCircle className='Icon'></BiUserCircle> My Account </Link>
                
                <Link to='/orders'> <BsBox2 className='Icon'></BsBox2> Orders </Link>
                
                {user.userRole[0] === 'buyer'
                ? <Link to='/favourites'> <BsBagHeart className='Icon'></BsBagHeart> Wishlist <span> 10 </span></Link> 
                    : <Link to='/shop'> <RxDashboard className='Icon'></RxDashboard> Shop </Link> 
                }
                
            </div>
        }

    </section> 
</>

)
}

export default UserProfile
