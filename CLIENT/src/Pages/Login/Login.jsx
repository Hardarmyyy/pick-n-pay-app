import React from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import LoginForm from './LoginForm/LoginForm'
import UseLogin from '../../Hooks/UseLogin'
import UseValidateLoginform from '../../Hooks/UseValidateLoginForm'
import './Login.css'
import Logo from '../../Layouts/Logo/Logo'


const Login = () => { 

const status = useSelector((state) => state.auth.status )
const loginSuccessMessage = useSelector((state) => state.auth.loginSuccess)
const loginError = useSelector((state) => state.auth.loginError)

// define state to manage form object data, form object errors, form object style, and toast notification
const [regUser, setRegUser] = useState({
    username: '',
    password: ''
})

const [error, setError] = useState({})
const [invalid, setInvalid] = useState({})

// define a function to handle form state
const handleChange = (e) => {
    const {name, value} = e.target;
    setRegUser((regUser) => {return {...regUser, [name]: value.replace(/\s/g, "")}})
    // validating form state;
    if (name === 'username') {
        setError((error) => {return {...error, username: value ? '': 'Kindly enter username' }})
        setInvalid((invalid) => {return {...invalid, username: value ? false : true}})
    }
    if (name === 'password') {
        setError((error) => {return {...error, password: value ? '': 'Kindly enter password' }})
        setInvalid((invalid) => {return {...invalid, password: value ? false : true}})
    }
}

// import and use validateLoginForm hooke to catch errors on the form object;
const {errors, invalids} = UseValidateLoginform(regUser)

//import and use the useLogin hook
const  {showPassword, handleShowPassword, handleLogin, toast, canLogin} = UseLogin(regUser)

// define a function to handle form submit
const handleFormSubmit = async (e) => {
    e.preventDefault()

    setError(errors)
    setInvalid(invalids)

    if (canLogin) {
        await handleLogin()
    }
}

return (

<>
    <Logo></Logo>

    {toast.success && <p className='loginMessage'> {loginSuccessMessage} </p>}
    {toast.error && <p className='loginError'> {loginError} </p>}

    <LoginForm
        regUser={regUser}
        error={error} 
        invalid={invalid} 
        handleChange={handleChange} 
        submitForm={handleFormSubmit}
        showPassword={showPassword} 
        handleShowPassword={handleShowPassword}
        status={status}>
    </LoginForm>
</>

)
}
export default Login
