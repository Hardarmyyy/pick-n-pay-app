import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Logo from '../../../Layouts/Logo/Logo'
import VerifyEmailForm from './VerifyEmailForm/VerifyEmailForm'
import SuccessModal from '../../../Layouts/SuccessModal/SuccessModal'
import ExpiredLink from '../../../component/ExpiredLink'
import Verified from '../../../component/Verified'
import UseVerifyEmail from '../../../Hooks/Auth/VerifyEmail/UseVerifyEmail'
import Modal from '../../../component/Modal'
import Spinner from '../../../component/Spinner'
import 'react-toastify/dist/ReactToastify.css';



const VerifyEmail = () => {

// Retrieve the query params from the current page;
const location = useLocation()
const searchParams = new URLSearchParams(location.search)
const token = searchParams?.get('token') 
const email = searchParams?.get('email') 

const modalMessage = `Your email has been verified successfully`

const {isValid, isVerified, status, verifyEmailStatus, signupOtp, error, handleChange, inputRefs, openModal, handleOpenModal, handleBackspace, handleVerifyEmail, handleVerifyEmailToken} = UseVerifyEmail(token, email) 

// define a function to handle form submission
const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    await handleVerifyEmail()
}

useEffect(() => {
    handleVerifyEmailToken()
}, [token, email])

if (status === 'Loading.......') {
    return (
        <>
            <div className='tablet:mt-4 mini:mt-4 laptop:mt-4 super:mt-4 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 sticky top-0 left-0 z-40 bg-white'>
                <Logo></Logo>
            </div>
            <section className='w-full h-1/2 tablet:h-1/2 mini:h-3/5 laptop:h-3/4 super:h-3/4 flex justify-center items-center py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 loader'>
                <Spinner></Spinner>
            </section>
        </>
    );
}

return (

<>
    {verifyEmailStatus == 'Loading...' && <Modal> <Spinner></Spinner> </Modal>}

    <ToastContainer 
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}/>

    <div className='tablet:mt-4 mini:mt-4 laptop:mt-4 super:mt-4 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 sticky top-0 left-0 z-40 bg-white'>
        <Logo></Logo>
    </div>

    {isVerified && status !== 'Loading.......' && 
        <section className='w-full h-1/2 tablet:h-1/2 mini:h-3/5 laptop:h-3/4 super:h-3/4 flex justify-center items-center py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60'>
        <div className='sm:w-4/5 sm:h-1/2 md:w-3/4 md:h-1/2 tablet:w-80 shadow-md tablet:h-72 mini:w-80 mini:h-80 laptop:w-96 laptop:h-96 super:w-96 super:h-96 flex flex-col justify-center items-center font-Montserrat text-my-primary mx-auto rounded-md p-4 bg-white relative popupmodal'>
            <Verified></Verified> 
        </div>
    </section>
    }

    {!isValid && !isVerified && status !== 'Loading.......' && 
        
        <section className='w-full h-1/2 tablet:h-1/2 mini:h-3/5 laptop:h-3/4 super:h-3/4 flex justify-center items-center py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60'>
            <div className='sm:w-4/5 sm:h-1/2 md:w-3/4 md:h-1/2 tablet:w-80 shadow-md tablet:h-72 mini:w-80 mini:h-80 laptop:w-96 laptop:h-96 super:w-96 super:h-96 flex flex-col justify-center items-center font-Montserrat text-my-primary mx-auto rounded-md p-4 bg-white relative popupmodal'>
                <ExpiredLink></ExpiredLink> 
            </div>
        </section>
    
    }

    {isValid && status !== 'Loading.......' &&
        <section className='w-full h-4/5 py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex justify-center items-center'>
            <VerifyEmailForm 
                verifyEmailStatus={verifyEmailStatus}
                signupOtp={signupOtp} 
                error={error}
                inputRefs={inputRefs}
                handleBackspace={handleBackspace}
                handleChange={handleChange} 
                submitForm={handleFormSubmit}>
            </VerifyEmailForm>
            {openModal && <SuccessModal handleOpenModal={handleOpenModal} message={modalMessage}></SuccessModal>}
        </section>          
    }
</>

)
}

export default VerifyEmail