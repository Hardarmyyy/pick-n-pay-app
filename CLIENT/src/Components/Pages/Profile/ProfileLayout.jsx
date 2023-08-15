import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import UserProfile from '../Navigation/UserProfileCard/UserProfile';
import { useState, useContext } from 'react';
import { myUserContext } from '../../../Utilities/UserContext';
import DeleteProfileModal from './DeleteProfileModal/DeleteProfileModal';

const ProfileLayout = () => {

// define a state to show and hide the useProfile card;
const [active, setActive] = useState(false) 

// destructure username from myUserContext;
const {user} = useContext(myUserContext)
const {username} = user

// define a state to open and close deleteAccount Modal
const [deleteModal, setDeleteModal] = useState(false)

// define a function to open delete modal 
const openModal = () => { 
    setDeleteModal(true);
}

// define a function to close delete Modal;
const closeModal = () => { 
    setDeleteModal(false);
}

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

    <div className='profileLinks'>
            <p> <Link to={`/profile/edit/${username}`}>  Edit profile  </Link> </p>
            <p> <Link to={`/profile/update-password/${username}`}> Change Password </Link> </p>
            <p onClick={openModal}> <Link> Delete account </Link> </p>
    </div>

    {deleteModal && <DeleteProfileModal closeModal={closeModal}></DeleteProfileModal>}

    <Outlet></Outlet>
</>
)
}

export default ProfileLayout