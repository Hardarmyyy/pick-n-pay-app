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
        <div className="bg-my-bg-primary w-full h-full fixed top-0 left-0 z-50"> 

            <div className='w-96 h-96 flex flex-col justify-center items-center font-Montserrat text-my-primary mx-auto rounded-md p-4 bg-white lg:translate-y-28 md:translate-y-20 relative'>

                <SuccessIcon></SuccessIcon>
                <p className='text-2xl font-bold my-2'> Congratulations </p>
                <p className='text-md my-2'> {message} </p>

                <div>
                    <Link to='#' onClick={handleGoToLogin}> <Button  padding='5px 25px' margin='10px auto'> Proceed to login </Button> </Link> 
                </div>

                <button className='absolute top-4 right-5 text-4xl text-crimson' onClick={handleOpenModal}> X </button>

            </div>

        </div>
    </>

)
}

export default successModal