import React from 'react'
import Button from '../../component/Button'
import SuccessIcon from '../../component/SuccessIcon'
import { useNavigate, Link } from 'react-router-dom'



const successModal = ({message, handleOpenModal}) => {

const navigate = useNavigate()

const handleGoToLogin = () => {
    navigate('/login', {replace: true})
}

return (

    <>
        <div className="bg-my-bg-primary w-full min-h-screen fixed top-0 left-0 z-50"> 

            <div className='sm:w-4/5 sm:h-1/2 md:w-3/4 md:h-1/2 tablet:w-80 tablet:h-72 mini:w-80 mini:h-80 laptop:w-96 laptop:h-96 super:w-96 super:h-96 flex flex-col justify-center items-center font-Montserrat text-my-primary mx-auto rounded-md p-4 bg-white relative popupmodal'>

                <SuccessIcon></SuccessIcon>
                <p className='text-2xl font-bold my-2'> Congratulations </p>
                <p className='text-sm my-2 text-center'> {message} </p>

                <div>
                    <Link to='#' onClick={handleGoToLogin}> <Button  padding='10px 25px' margin='10px auto'> Proceed to login </Button> </Link> 
                </div>

                <button onClick={handleOpenModal} type="button" className="absolute top-4 right-5 text-crimson bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>

            </div>

        </div>
    </>

)
}

export default successModal