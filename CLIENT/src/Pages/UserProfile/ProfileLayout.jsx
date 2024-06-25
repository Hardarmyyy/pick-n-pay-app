import React from 'react'
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navigation from '../../Layouts/Navigation/Navigation';
import DeleteProfileModal from '../../Layouts/DeleteProfileModal/DeleteProfileModal';
import UseSwicthProfile from '../../Hooks/Profile/UseSwicthProfile';
import Button from '../../component/Button';


const ProfileLayout = () => {

const {handleSwicthProfile} = UseSwicthProfile()

// define a state to open delete Modal
const [openModal, setOpenModal] = useState(false)

// define a function to open modal 
const handleOpenModal = () => { 
    setOpenModal(!openModal);
}


return (
<>
    <ToastContainer 
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}/>

    <Navigation></Navigation>
    
    <section className='min-w-full h-auto px-6 flex'>

        <div className='w-40 h-96 py-3 bg-gray-200 rounded-md md:text-sm shadow-sm text-center text-my-primary font-Montserrat'>

            <p className='mb-2'><NavLink className={({ isActive }) => isActive ? "py-1 px-3 mb-2 bg-gray-400 rounded-sm" : null} to={`/profile/update-profile`}>  Update profile  </NavLink></p>
            <p className='mb-2'> <NavLink className={({ isActive }) => isActive ? "py-1 px-2 bg-gray-400 rounded-sm" : null} to={`/profile/update-password`}> Change Password </NavLink> </p>
            <Button margin= '5px 0px' eventHandler={() => handleSwicthProfile()}> Switch Profile </Button>
            <Button padding='5px 5px' margin= '8px 0px' backgroundColor='crimson' eventHandler={handleOpenModal}> Delete account </Button>

        </div>

        {openModal && <DeleteProfileModal handleCloseModal={handleOpenModal}></DeleteProfileModal>}

        <Outlet></Outlet>

    </section>

</>
)
}

export default ProfileLayout