import React from 'react'
import Navigation from '../../Layouts/Navigation/Navigation';
import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react';
import { BsCart3 } from "react-icons/bs";

const ProfileLayout = () => {

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
    
    <Navigation></Navigation>
    
    <div className='profileLinks'>
            <p> <Link to={`/profile/edit/${{}}`}>  Edit profile  </Link> </p>
            <p> <Link to={`/profile/update-password/${{}}`}> Change Password </Link> </p>
            <p onClick={openModal}> <Link> Delete account </Link> </p>
    </div>

    {/* {deleteModal && <DeleteProfileModal closeModal={closeModal}></DeleteProfileModal>} */}

    <Outlet></Outlet>
</>
)
}

export default ProfileLayout