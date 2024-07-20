import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom'
import DeleteProfileModal from '../../Layouts/DeleteProfileModal/DeleteProfileModal';
import UseSwicthProfile from '../../Hooks/Profile/UseSwicthProfile';
import UseDeleteUser from '../../Hooks/Profile/UseDeleteUser';
import Button from '../../component/Button';
import Modal from '../../component/Modal'
import Spinner from '../../component/Spinner'


const ProfileLayout = () => {

const profileStatus = useSelector((state) => state?.user?.status)

const {handleSwicthProfile} = UseSwicthProfile()
const {isOpenModal, handleOpenModal} = UseDeleteUser()

return (
<>
    {profileStatus === 'Loading.......' && <Modal> <Spinner></Spinner> </Modal>}

    <section className='w-full min-h-[70vh] py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex justify-center items-start sm:items-center'>

        <div className='sm:hidden md:hidden tablet:w-1/5 mini:w-36 laptop:w-44 super:w-44 h-auto py-3 text-sm bg-gray-200 rounded-md shadow-sm text-my-primary font-Montserrat flex flex-col justify-center items-center'>

            <p className='mb-2'><NavLink className={({ isActive }) => isActive ? "" : null} to={`/profile/update-profile`}>  Update profile  </NavLink></p>
            <p className='mb-2'> <NavLink className={({ isActive }) => isActive ? "" : null} to={`/profile/update-password`}> Update password </NavLink> </p>
            <Button margin= '5px 0px' eventHandler={handleSwicthProfile}> Switch profile </Button>
            <Button padding='5px 5px' margin= '8px 0px' backgroundColor='crimson' eventHandler={handleOpenModal}> Delete account </Button>

        </div>

        <Outlet></Outlet>

    </section>

    {isOpenModal && <DeleteProfileModal handleCloseModal={handleOpenModal}></DeleteProfileModal>}
</>
)
}

export default ProfileLayout