import React from 'react'
import Button from '../../../../Utilities/Button'
import { BiUserCircle } from "react-icons/bi";
import { BsBox2 } from "react-icons/bs";
import '../UserProfileCard/UserProfile.css'
import { Link } from 'react-router-dom';
import { myUserContext } from '../../../../Utilities/UserContext';
import { useContext } from 'react';
import { BsBagHeart } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
const navigate = useNavigate()

const {user, handleSignOut, favouritesCounter} = useContext(myUserContext)
const {username, usertype} = user

// define a function to handle the signout process;

const userSignOut = () => {
    // remove user info from local storage;
    localStorage.removeItem('seller') || localStorage.removeItem('buyer')
    setTimeout(() => {
        handleSignOut()
        navigate('/')
    }, 1200)
}


return (

<>
    <div className='profileConatiner'>

        <div className='login'>

            {username === null ? 

                <>
                    <Link to='/login'> <Button backgroundColor='crimson' padding='5px 40px'> Sign in </Button> </Link>
                    <p> or click <Link to='/signup'> here </Link> to sign up</p>
                </>
                
            :
                <Button eventHandler={userSignOut} backgroundColor='crimson' margin='0px 0px 5px 0px' padding='5px 40px'> Sign out </Button> 
            }

        </div>
        
        {usertype === null && 
            <div className='userInfo'>
                <Link to='/profile'> <BiUserCircle className='Icon'></BiUserCircle> My Account </Link> 
                <Link to='#'> <BsBox2 className='Icon'></BsBox2> Orders </Link> 
                <Link to='/favourites'> <BsBagHeart className='Icon'></BsBagHeart> Wishlist {favouritesCounter > 0 && <span> {favouritesCounter} </span>}</Link>
            </div>
        }
        {usertype === 'buyer' && 
            <div className='userInfo'>
                <p className='user'> Hi {username} </p>
                <Link to='/profile'> <BiUserCircle className='Icon'></BiUserCircle> My Account </Link> 
                <Link to='#'> <BsBox2 className='Icon'></BsBox2> Orders </Link> 
                <Link to='/favourites'> <BsBagHeart className='Icon'></BsBagHeart> Wishlist {favouritesCounter > 0 && <span> {favouritesCounter} </span>}</Link>
            </div>
        }
        { usertype === 'seller' &&
            <div className='userInfo'>
                <p className='user'> Hi {username} </p>
                <Link to='/profile'> <BiUserCircle className='Icon'></BiUserCircle> My Account </Link> 
                <Link to='/shop'> <RxDashboard className='Icon'></RxDashboard> Shop </Link> 
                <Link to='#'> <BsBox2 className='Icon'></BsBox2> Orders </Link> 
            </div>
        }

    </div> 
</>

)
}

export default UserProfile
