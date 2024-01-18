import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Navigation from '../../Layouts/Navigation/Navigation';
import Button from '../../component/Button';
import { BsCart3 } from "react-icons/bs";

const ProfileLayout = () => {


return (
<>
    
    <Navigation></Navigation>
    
    <section className='min-w-full px-6'>

        <div className='w-40 h-96 py-8 bg-gray-200 rounded-md md:text-sm lg:text-lg shadow-sm text-center text-my-primary font-Montserrat'>

            <p className='my-1 py-1 hover:bg-gray-400 rounded-sm'> <Link to={`/profile/update-profile`}>  Update profile  </Link> </p>
            <p className='my-1 py-1 hover:bg-gray-400 rounded-sm'> <Link to={`/profile/update-password`}> Change Password </Link> </p>
            <Button margin= '10px 10px'> Switch Profile </Button>
            <Button padding='5px 5px' margin= '15px 10px' backgroundColor='crimson'> Delete account </Button>

        </div>

    </section>

    <Outlet></Outlet>
</>
)
}

export default ProfileLayout