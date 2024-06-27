import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SuccessIcon from './SuccessIcon'
import Button from './Button'


const Verified = () => {

const navigate = useNavigate()

const handleGoToLogin = () => {
    navigate('/login', {replace: true})
}

  return (

    <>
        <div className='sm:w-4/5 sm:h-1/2 md:w-3/4 md:h-1/2 tablet:w-80 tablet:h-72 mini:w-80 mini:h-80 laptop:w-96 laptop:h-96 super:w-96 super:h-96 shadow-md flex flex-col justify-center items-center font-Montserrat text-my-primary mx-auto rounded-md p-4 bg-white relative'>
            <SuccessIcon></SuccessIcon>
            <p className='my-2 text-sm text-center'> Your email has already been verified </p>
            
            <div>
                <Link to='#' onClick={handleGoToLogin}> <Button  padding='10px 25px' margin='10px auto'> Continue to login </Button> </Link> 
            </div>
        </div>
    </>
  )
}

export default Verified