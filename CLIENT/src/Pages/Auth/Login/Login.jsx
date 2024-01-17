import React from 'react'
import { ToastContainer } from 'react-toastify'
import Logo from '../../../Layouts/Logo/Logo'
import LoginForm from './LoginForm/LoginForm'
import UseLogin from '../../../Hooks/Auth/Login/UseLogin'



const Login = () => { 

//import and use the useLogin hook
const  {regUser, error, handleChange, showPassword, handleShowPassword, handleLogin} = UseLogin()

// define a function to handle form submit
const handleFormSubmit = async (e) => {
    e.preventDefault()

    await handleLogin()
}

return (

<>
    <ToastContainer 
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}/>

    <div className='p-4'>
        <Logo></Logo>
    </div>

    <LoginForm
        regUser={regUser}
        error={error} 
        handleChange={handleChange} 
        submitForm={handleFormSubmit}
        showPassword={showPassword} 
        handleShowPassword={handleShowPassword}>
    </LoginForm>

</>

)
}
export default Login
