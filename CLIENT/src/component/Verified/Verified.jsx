import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SuccessIcon from '../SuccessIcon'
import Button from '../Button'


const Verified = () => {

const navigate = useNavigate()

const handleGoToLogin = () => {
    navigate('/login', {replace: true})
}

  return (

    <>
        <div className='w-96 h-96 flex flex-col border shadow-sm justify-center items-center font-Montserrat text-my-primary mx-auto rounded-md p-4 bg-white translate-y-10 lg:translate-y-10 relative'>

            <div className='flex flex-col justify-center items-center'> 
                <SuccessIcon></SuccessIcon>
                <p className='my-2 text-lg'> Your email has already been verified </p>
                
                <div>
                    <Link to='#' onClick={handleGoToLogin}> <Button  padding='5px 25px' margin='10px auto'> Continue to login </Button> </Link> 
                </div>
            </div>

        </div>
    </>
  )
}

export default Verified