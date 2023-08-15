import React from 'react'
import '../OrderCompleteModal/Modal.css'
import { useContext } from 'react'
import { myUserContext } from '../../../../Utilities/UserContext'
import uniqid from 'uniqid'
import {Link} from 'react-router-dom'


const Modal = ({closeModal}) => {

const {user} = useContext(myUserContext)
const {username} = user

return (

<>

    <div className="modalBackground">

        <div className='modalContainer'>

            <div className="modalContent">

                <h3> Hi, {username} </h3>
                <p> Your order has been completed sucessfully.</p>
                <p> Order Id: <span className='id'> {uniqid()} </span> </p>
                <p> {Date()} </p>
            </div>

            <button className='closeModalBtn' onClick={closeModal}> <Link to='/'>  Continue shopping </Link> </button>

        </div>

    </div>

</>

)
}

export default Modal