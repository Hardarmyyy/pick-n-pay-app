import React from 'react'
import { ToastContainer } from 'react-toastify'
import Logo from '../../Layouts/Logo/Logo'
import SignupForm from './SignupForm/SignupForm'
import Modal from '../../Layouts/Modal/Modal'
import UseSignup from '../../Hooks/UseSignup'
import './SignUp.css'
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

//import UseSignup hook for form submission
const {newUser, error, invalid, handleChange, openModal, showPassword, handleShowPassword, handleSignup} = UseSignup()

// define a function to handle form submission
const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    await handleSignup()

}

return ( 

<>
    <Logo></Logo>

    <ToastContainer 
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}/>

    <SignupForm 
        newUser={newUser}
        error={error}
        invalid={invalid}
        showPassword={showPassword}
        handleShowPassword={handleShowPassword}
        handleChange={handleChange}
        submitForm={handleFormSubmit}>
    </SignupForm> 

    {openModal && <Modal></Modal>}
</>
)
}

export default SignUp
