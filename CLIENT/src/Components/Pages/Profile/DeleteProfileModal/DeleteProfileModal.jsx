import React from 'react'
import { myUserContext } from '../../../../Utilities/UserContext'
import { useContext } from 'react'
import Button from '../../../../Utilities/Button'
import '../DeleteProfileModal/DeleteProfileModal.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DeleteProfileModal = ({closeModal}) => {

const {user, handleSignOut} = useContext(myUserContext)
const {username} = user

const navigate = useNavigate()

// define a function to handle user profile deletion

const handleDelete = () => {
    axios
    .delete('http://localhost:4050/api/user/'+username)
    .then((response) => {
        setTimeout(() => {
            // define a function to handle automatic signout process and remove user info from local storage;
            localStorage.removeItem('seller') || localStorage.removeItem('buyer')
            handleSignOut()
            navigate('/')
        }, 1200)

    })
    .catch((error) => {
        
    })
}

return (

<>
    
    <div className="deleteModalBackground">

        <div className='deleteModalContainer'>

            <div className="deleteModalContent">
                <p> <strong> Hi, </strong> {username} </p>
                <p> Are you sure you want to delete you account ?</p>
            </div>

            <div>
                <Button eventHandler={handleDelete} backgroundColor='crimson' padding='5px 25px'> Delete </Button>
                <Button eventHandler={closeModal} backgroundColor='green' padding='5px 25px'> Cancel </Button>
            </div>

        </div>

    </div>
</>

)
}

export default DeleteProfileModal