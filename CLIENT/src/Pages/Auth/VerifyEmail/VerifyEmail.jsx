import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Logo from '../../../Layouts/Logo/Logo'
import VerifyEmailForm from './VerifyEmailForm/VerifyEmailForm'
import SuccessModal from '../../../Layouts/SuccessModal/SuccessModal'
import ExpiredLink from '../../../component/ExpiredLink/ExpiredLink'
import Verified from '../../../component/Verified/Verified'
import UseVerifyEmail from '../../../Hooks/Auth/VerifyEmail/UseVerifyEmail'
import 'react-toastify/dist/ReactToastify.css';
import './VerifyEmail.css' 


const VerifyEmail = () => {

const isValid = useSelector((state) => state?.auth.isValid)
const isVerified = useSelector((state) => state?.auth.isVerified)
const status = useSelector((state) => state.auth.status)

// Retrieve the query params from the current page;
const location = useLocation()
const searchParams = new URLSearchParams(location.search)
const token = searchParams?.get('token') 
const email = searchParams?.get('email') 

const modalMessage = `Your email has been verified successfully`

const {signupOtp, invalid, error, handleChange, inputRefs, openModal, handleBackspace, handleVerifyEmail, handleVerifyEmailToken} = UseVerifyEmail(token, email) 

// define a function to handle form submission
const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    await handleVerifyEmail()
}

useEffect(() => {
    handleVerifyEmailToken()
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

    {isVerified && <Verified></Verified>}

    {!isValid && status === 'failed' && <ExpiredLink></ExpiredLink> }

    {isValid && 
        <>
            <VerifyEmailForm 
                status={status}
                signupOtp={signupOtp} 
                invalid={invalid} 
                error={error}
                inputRefs={inputRefs}
                handleBackspace={handleBackspace}
                handleChange={handleChange} 
                submitForm={handleFormSubmit}>
            </VerifyEmailForm>
            {openModal && <SuccessModal message={modalMessage}></SuccessModal>}
        </>           
    }
</>

)
}

export default VerifyEmail