import React from 'react'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../EditProfile/EditProfile.css'
import Button from '../../../../Utilities/Button'
import { myUserContext } from '../../../../Utilities/UserContext';


const EditProfile = () => {

const navigate = useNavigate();

// catch the user that needs to edit profile using the useParams hook;
const {username} = useParams();

// import the allUser from the user context and filter the exact user;
const {user, allUser} = useContext(myUserContext);
const {usertype, shop, order, cartProducts, favourites, orders} = user
const updateUser = allUser.filter((u) => u.username === username);


//define a state to manage new profile changes 
const [profileChange, setProfileChange] = useState({
        username: updateUser[0].username,
        email: updateUser[0].email, 
})

// define a function to manage password change event;
const handleProfileChange = (e) =>  {
    const {name, value} = e.target
    setProfileChange((profileChange) => {
        return {...profileChange, [name]: value.replace(/\s/g, "")}
    })
}

//define a state to manage password confirmation message
const [updateProfileMessage, setupdateProfileMessage] = useState(null)
const [updateProfileError, setupdateProfileError] = useState(null)


const handleSubmit = (e) => {
    e.preventDefault()
    axios
    .patch('http://localhost:4050/api/user/update/'+updateUser[0].username, profileChange)
    .then((response) => {
        setupdateProfileMessage("Your profile has been updated successfully");
        
        if (usertype === 'buyer') {
            // update the user profile in the local storage
            const updatedBuyerProfile = {
                usertype: usertype,
                username: profileChange.username,
                email: profileChange.email,
                cartProducts: cartProducts,
                favourites: favourites,
                orders: orders
            }
            // save the userdata in local storage;
            localStorage.setItem('buyer', JSON.stringify(updatedBuyerProfile))
        }
        else if (usertype === 'seller') {
            // update the user profile in the local storage
            const updatedSellerProfile = {
                usertype: usertype,
                username: profileChange.username,
                email: profileChange.email,
                shop: shop,
                order: order
            }
            // save the userdata in local storage;
            localStorage.setItem('seller', JSON.stringify(updatedSellerProfile))
        }
        setTimeout(() => { 
            setupdateProfileMessage(null);
            window.location.reload();
        }, 1200)
        setTimeout(() => {
            navigate('/profile')
        }, 1000)
    })
    .catch((error) => {
        setupdateProfileError(error.response.data.error);
        setTimeout(() => {
            setupdateProfileError(null);
        },1200);
    })
}


return (

<>
    {updateProfileMessage && <p className='updateProfileMessage'> {updateProfileMessage} </p>}
    {updateProfileError && <p className='updateProfileError'> {updateProfileError} </p>}

    <section className='editProfileContainer'>

        <form onSubmit={handleSubmit}>

            <div className='profileUsername'>
                <label> Username: </label>
                <input type='text' name='username' value={profileChange.username} onChange={handleProfileChange} maxLength={30}/>
            </div>

            <div className='profileEmail'>
                <label> E-mail: </label>
                <input type='email' name='email' value={profileChange.email} onChange={handleProfileChange} maxLength={30}/>
            </div>

            <div className='updateProfileButton'>
                <Button margin='5px 30px'> Save changes </Button>
            </div>
            
        </form>

    </section>
</>
)
}

export default EditProfile