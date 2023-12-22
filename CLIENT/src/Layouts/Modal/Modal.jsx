import React from 'react'
import SuccessIcon from '../../component/SuccessIcon'
import './Modal.css'


const Modal = () => {


return ( 

    <>
        <div className="modalBackground">

            <div className='modalContainer'>

                <div className="modalContent">
                    <SuccessIcon></SuccessIcon>
                    <p> Thank you for signing up.</p>
                    <p> Verification code has been sent to your email successfully. </p>
                    <p> Kindly verify your email to continue </p>
                </div>

            </div>

        </div>
    </>

)
}

export default Modal