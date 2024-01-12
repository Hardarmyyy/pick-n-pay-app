import { useEffect } from 'react'
import {useSelector } from 'react-redux'
import {useLocation } from 'react-router-dom'
import UseResetPassword from '../../../Hooks/Auth/ResetPassword/UseResetPassword'
import { ToastContainer } from 'react-toastify'
import Logo from '../../../Layouts/Logo/Logo'
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'
import ExpiredLink from '../../../component/ExpiredLink/ExpiredLink'
import SuccessModal from '../../../Layouts/SuccessModal/SuccessModal'
import 'react-toastify/dist/ReactToastify.css';
import './ResetPassword.css'

const ResetPassword = () => {

const isValid = useSelector((state) => state?.auth.isValid)
const status = useSelector((state) => state.auth.status)

// Retrieve the query params from the current page and serve it as the query params to the OTP dispatched action
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const token = searchParams?.get('token')
const email = searchParams?.get('email')

const modalMessage = `Your password has been reset successfully`

const {user, error, invalid, handleChange, handleVerifyResetToken, handleResetPassword, openModal, showPassword, handleShowPassword, showConfirmPassword, handleShowConfirmPassword} = UseResetPassword(email, token) 

const handleSubmit = async(e) => {
    e.preventDefault()

    await handleResetPassword()
}

useEffect(() => {
    handleVerifyResetToken()
}, [token, email])

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

        {isValid &&
            <>

                <ResetPasswordForm
                    status={status}
                    submitForm = {handleSubmit} 
                    invalid={invalid}
                    error={error} 
                    handleChange={handleChange} 
                    user={user}
                    showPassword={showPassword}
                    handleShowPassword={handleShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    handleShowConfirmPassword={handleShowConfirmPassword}>
                </ResetPasswordForm>

                {openModal && <SuccessModal message={modalMessage}></SuccessModal>}

            </>
        }

        {!isValid && status === 'failed' && <ExpiredLink></ExpiredLink>}

    </>
)
}

export default ResetPassword