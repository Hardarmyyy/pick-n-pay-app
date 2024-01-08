import React from 'react'
import { ToastContainer } from 'react-toastify'
import Logo from '../../../Layouts/Logo/Logo'
import LoginForm from './LoginForm/LoginForm'
import UseLogin from '../../../Hooks/Auth/Login/UseLogin'
import './Login.css'



const Login = () => { 

//import and use the useLogin hook
const  {regUser, error, invalid, handleChange, showPassword, handleShowPassword, handleLogin} = UseLogin()

// define a function to handle form submit
const handleFormSubmit = async (e) => {
    e.preventDefault()

    await handleLogin()
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

    <LoginForm
        regUser={regUser}
        error={error} 
        invalid={invalid} 
        handleChange={handleChange} 
        submitForm={handleFormSubmit}
        showPassword={showPassword} 
        handleShowPassword={handleShowPassword}>
    </LoginForm>

</>

)
}
export default Login
