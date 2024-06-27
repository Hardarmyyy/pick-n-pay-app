import { useEffect } from 'react'
import {useLocation } from 'react-router-dom'
import UseResetPassword from '../../../Hooks/Auth/ResetPassword/UseResetPassword'
import { ToastContainer } from 'react-toastify'
import Logo from '../../../Layouts/Logo/Logo'
import Spinner from '../../../component/Spinner'
import Modal from '../../../component/Modal'
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'
import ExpiredLink from '../../../component/ExpiredLink'
import SuccessModal from '../../../Layouts/SuccessModal/SuccessModal'
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {

    // Retrieve the query params from the current page and serve it as the query params to the OTP dispatched action
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams?.get('token')
    const email = searchParams?.get('email')

    const modalMessage = `Your password has been reset successfully` 

    const {isValid, status, verifyResetStatus, user, error, handleChange, handleVerifyResetToken, handleResetPassword, openModal, handleOpenModal, showPassword, handleShowPassword, showConfirmPassword, handleShowConfirmPassword} = UseResetPassword(email, token) 

    const handleSubmit = async(e) => {
        e.preventDefault()
        await handleResetPassword()
    }

    useEffect(() => {
        handleVerifyResetToken()
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
        {verifyResetStatus == 'Loading...' && <Modal> <Spinner></Spinner> </Modal>}

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

        {!isValid && status !== 'Loading.......' && 
            <section className='w-full sm:h-4/5 md:h-4/5 tablet:min-h-screen mini:min-h-screen laptop:min-h-screen super:min-h-screen py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex justify-center items-center'>
                <ExpiredLink></ExpiredLink> 
            </section>
        }

        {isValid && status !== 'Loading.......' && 
            <section className='w-full sm:h-4/5 md:h-4/5 tablet:min-h-screen mini:min-h-screen laptop:min-h-screen super:min-h-screen py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex justify-center items-center'>

                <ResetPasswordForm
                    verifyResetStatus={verifyResetStatus}
                    submitForm = {handleSubmit} 
                    error={error} 
                    handleChange={handleChange} 
                    user={user}
                    showPassword={showPassword}
                    handleShowPassword={handleShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    handleShowConfirmPassword={handleShowConfirmPassword}>
                </ResetPasswordForm>

                {openModal && <SuccessModal handleOpenModal={handleOpenModal} message={modalMessage}></SuccessModal>}

            </section>
        }

    </>
)
}

export default ResetPassword