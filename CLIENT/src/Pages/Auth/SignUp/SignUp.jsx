import React from 'react'
import { ToastContainer } from 'react-toastify'
import Logo from '../../../Layouts/Logo/Logo'
import SignupForm from './SignupForm/SignupForm'
import SignUpModal from '../../../Layouts/SignUpModal/SignUpModal'
import UseSignup from '../../../Hooks/Auth/Signup/UseSignup'
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

//import UseSignup hook for form submission
const {newUser, error, handleChange, openModal, handleOpenModal, showPassword, handleShowPassword, handleSignup} = UseSignup()

// define a function to handle form submission
const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    await handleSignup()

}

return ( 

<>

    <ToastContainer 
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}/>

    <div className='p-4'>
        <Logo></Logo>
    </div>

    <SignupForm 
        newUser={newUser}
        error={error}
        showPassword={showPassword}
        handleShowPassword={handleShowPassword}
        handleChange={handleChange}
        submitForm={handleFormSubmit}>
    </SignupForm> 

    {openModal && <SignUpModal handleOpenModal={handleOpenModal}></SignUpModal>}
</>
)
}

export default SignUp
