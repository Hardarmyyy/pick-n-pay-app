import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SuccessIcon from '../SuccessIcon'
import Button from '../Button'
import './Verified.css'

const Verified = () => {

const navigate = useNavigate()

const handleGoToLogin = () => {
    navigate('/login', {replace: true})
}

  return (

    <>
        <div className='verifiedContent'>

            <div>
                <SuccessIcon></SuccessIcon>
                <p> Your email has already been verified </p>
            </div>

            <div>
                <Link to='#' onClick={handleGoToLogin}> <Button  padding='5px 25px'> Continue to login </Button> </Link> 
            </div>

        </div>
    </>
  )
}

export default Verified