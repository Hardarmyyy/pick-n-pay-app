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

    <div className='tablet:mt-4 mini:mt-4 laptop:mt-4 super:mt-4 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 sticky top-0 left-0 z-50 bg-white'>
        <Logo></Logo>
    </div>

    <section className='w-full sm:h-4/5 md:h-4/5 tablet:min-h-screen mini:min-h-screen laptop:min-h-screen super:min-h-screen py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex justify-center items-center'>

        <SignupForm 
            newUser={newUser}
            error={error}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            handleChange={handleChange}
            submitForm={handleFormSubmit}>
        </SignupForm> 

        {openModal && <SignUpModal handleOpenModal={handleOpenModal}></SignUpModal>}

    </section>

</>
)
}

export default SignUp
