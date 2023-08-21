import React from 'react'
import '../OrderCompleteModal/Modal.css'
import { useContext } from 'react'
import { myUserContext } from '../../../../Utilities/UserContext'
import {Link, useNavigate} from 'react-router-dom'


const Modal = ({closeModal}) => {

const navigate = useNavigate()

const {user, handleEmptyCart} = useContext(myUserContext)
const {username} = user

const handleCloseModal = () => {
    closeModal()
    handleEmptyCart()
    navigate('/')
}

return (

<>

    <div className="modalBackground">

        <div className='modalContainer'>

            <div className="modalContent">

                <h3> Hi, {username} </h3>
                <p> Your order has been completed sucessfully.</p>
                <p> We will send you information about the shipping details. </p>
                <p> {Date()} </p>
            </div>

            <button className='closeModalBtn' onClick={handleCloseModal}> <Link to='/'>  Continue shopping </Link> </button>

        </div>

    </div>

</>

)
}

export default Modal