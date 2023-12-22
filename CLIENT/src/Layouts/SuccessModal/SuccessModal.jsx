import React from 'react'
import Button from '../../component/Button'
import SuccessIcon from '../../component/SuccessIcon'
import { useNavigate, Link } from 'react-router-dom'
import './SuccessModal.css'


const successModal = ({message}) => {

const navigate = useNavigate()

const handleGoToLogin = () => {
    navigate('/login', {replace: true})
}

return (

    <>
        <div className="modalBackground">

            <div className='modalContainer'>

                <div className="modalContent">
                    <SuccessIcon></SuccessIcon>
                    <p> <strong> Congratulations </strong> </p>
                    <p> {message} </p>
                </div>

                <div>
                    <Link to='#' onClick={handleGoToLogin}> <Button  padding='5px 25px'> Proceed to login </Button> </Link> 
                </div>

            </div>

        </div>
    </>

)
}

export default successModal