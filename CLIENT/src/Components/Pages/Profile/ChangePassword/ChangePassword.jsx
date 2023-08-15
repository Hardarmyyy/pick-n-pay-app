import React from 'react'
import '../ChangePassword/ChangePassword.css'
import Button from '../../../../Utilities/Button'
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from 'react';
import { myUserContext } from '../../../../Utilities/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ChangePassword = () => {

const {user, handleSignOut} = useContext(myUserContext)
const {username} = user

const navigate = useNavigate()

// define a state to handle show currentpassword toggle
const [showCurrentPassword, setShowCurrentPassword] = useState(false)

// define a function to handle show currentpassword toggle;
const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword)
}
// define a state to handle show newpassword toggle
const [showNewPassword, setShowNewPassword] = useState(false)

// define a function to handle show newpassword toggle;
const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword)
}
// define a state to handle show confirmnewpassword toggle
const [showConfirmPassword, setShowConfirmPassword] = useState(false)

// define a function to handle show confirmpassword toggle;
const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
}

//define a state to manage password confirmation message
const [updatePasswordMessage, setupdatePasswordMessage] = useState(null)
const [updatePasswordError, setupdatePasswordError] = useState(null)

//define a state to manage password 
const [password, setPassword] = useState({
    currentpassword: '',
    newpassword: '',
    confirmnewpassword: ''
})

// define a function to manage password change event;
const handlePasswordChange = (e) =>  {
    const {name, value} = e.target
    setPassword((password) => {
        return {...password, [name]: value.replace(/\s/g, "")}
    })
}

// define a function to handle form submit
const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .patch('http://localhost:4050/api/user/password/change/'+username, password)
    .then((response) =>{
        setupdatePasswordMessage("password changed successfully");
        setPassword({
            currentpassword: '',
            newpassword: '',
            confirmnewpassword: ''
        })
        setTimeout(() => {
             // define a function to handle automatic signout process and remove user info from local storage;
            localStorage.removeItem('seller') || localStorage.removeItem('buyer')
            handleSignOut()
            navigate('/login')
        },1200)
    })
    .catch((error) => {
        setupdatePasswordError(error.response.data.error);
        setTimeout(() => {
            setupdatePasswordError(null);
        },1200);
    })
}

return (
<>  
    {updatePasswordMessage && <p className='updatePasswordMessage'> {updatePasswordMessage} </p>}
    {updatePasswordError && <p className='updatePasswordError'> {updatePasswordError} </p>}

    <section className='changePasswordContainer'>

    <form className='changePasswordForm' onSubmit={handleSubmit}>

        <div className='currentpassword'>
            <label> Current password: </label>
            <input type={showCurrentPassword ? 'text' : 'password'} name='currentpassword' value={password.currentpassword} onChange={handlePasswordChange}/>
            <div className="currentpasswordToggle" onClick={handleShowCurrentPassword}> { showCurrentPassword? <BsEye /> : <BsEyeSlash />} </div>
        </div>

        <div className='newpassword'>
            <label> New password : </label>
            <input type={showNewPassword ? 'text' : 'password'} name='newpassword' value={password.newpassword} onChange={handlePasswordChange}/>
            <div className="newpasswordToggle" onClick={handleShowNewPassword}> {showNewPassword ? <BsEye /> : <BsEyeSlash />} </div>
        </div>

        <div className='confrimnewpassword'>
            <label> Confirm new password : </label>
            <input type={showConfirmPassword ? 'text' : 'password'} name='confirmnewpassword' value={password.confirmnewpassword} onChange={handlePasswordChange}/>
            <div className="confirmpasswordToggle" onClick={handleShowConfirmPassword}> {showConfirmPassword ? <BsEye /> : <BsEyeSlash />} </div>
        </div>

        <div className='changePasswordButton'>
            <Button  padding='5px 30px'> Save changes </Button>
        </div>

    </form>

    </section>
</>
)
}

export default ChangePassword