import React from 'react'
import { useSelector } from 'react-redux'
import UseDeleteUser from '../../Hooks/Profile/UseDeleteUser'
import Button from '../../component/Button'


const DeleteProfileModal = ({handleCloseModal}) => {

const status = useSelector((state) => state?.auth?.status)

const {handleDeleteUser} = UseDeleteUser()

return (

    <>
        <div className="bg-my-bg-primary w-full h-full fixed top-0 left-0 z-50"> 

            <div className='w-96 h-96 flex flex-col justify-center items-center font-Montserrat text-my-primary mx-auto rounded-md p-4 bg-white lg:translate-y-28 md:translate-y-20 relative'>

                <p className='text-2xl font-bold my-2 text-center'> Are you sure you want to delete your account  </p>

                <div>
                    <Button  padding='5px 30px' margin='10px auto' backgroundColor='crimson' eventHandler={() =>handleDeleteUser()}> {status === 'Loading.......' ? <span> Deleting</span> : <span> Delete </span>} </Button>
                </div>

                <button className='absolute top-4 right-5 text-4xl text-crimson' onClick={handleCloseModal}> X </button>

            </div>

        </div>
    </>

)

}

export default DeleteProfileModal