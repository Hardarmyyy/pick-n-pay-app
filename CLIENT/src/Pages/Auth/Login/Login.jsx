import React from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Logo from '../../../Layouts/Logo/Logo'
import LoginForm from './LoginForm/LoginForm'
import UseLogin from '../../../Hooks/Auth/Login/UseLogin'
import Modal from '../../../component/Modal'



const Login = () => { 

const status = useSelector((state) => state?.auth?.status)

//import and use the useLogin hook
const  {regUser, error, handleChange, showPassword, handleShowPassword, handleLogin} = UseLogin()

// define a function to handle form submit
const handleFormSubmit = async (e) => {
    e.preventDefault()

    await handleLogin()
}

return (

<>
    {status === 'Loading.......' && <Modal></Modal>}

    <ToastContainer 
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}/>

    <div className='tablet:mt-4 mini:mt-4 laptop:mt-4 super:mt-4 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 sticky top-0 left-0 z-45 bg-white'>
        <Logo></Logo>
    </div>

    <section className='w-full sm:h-4/5 md:h-4/5 tablet:min-h-screen mini:min-h-screen laptop:min-h-screen super:min-h-screen py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex justify-center items-center'>

        <LoginForm
            regUser={regUser}
            error={error} 
            handleChange={handleChange} 
            submitForm={handleFormSubmit}
            showPassword={showPassword} 
            handleShowPassword={handleShowPassword}>
        </LoginForm>
        
    </section>

</>

)
}
export default Login
