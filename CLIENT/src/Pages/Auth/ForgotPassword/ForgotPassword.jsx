import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../../../Layouts/Logo/Logo'
import Button from '../../../component/Button'
import UseForgotPassword from '../../../Hooks/Auth/ForgotPassword/UseForgotPassword'
import { ToastContainer } from 'react-toastify'
import './ForgotPassword.css'
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {

const status = useSelector((state) => state.auth.status )

//import and use the forgotPassword hook;
const {user, error, invalid, handleChange, handleForgotPassword} = UseForgotPassword()

// define a state to handle form submission
const submitForm = (e) => {
    e.preventDefault()

    handleForgotPassword()
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

    <section className='forgotPasswordPage'>

        <p> Forgot Password </p>

        <form className='forgotPasswordForm' onSubmit={submitForm}>

            <div>

                <label> Email address <span className='required'> * </span></label> <br />
                <input type="text" className= {invalid?.email ? 'invalid' : null} 
                value={user.email} onChange={handleChange} name="email" placeholder="Enter your registered email address"/> <br /> <br />
                {error.email && <p className='emptyEmail'> {error.email}  </p> }

            </div>

            <div className='button'>
                <Button padding='5px 100px' margin='10px auto'> {status === 'Loading.......' ? <span> Sending </span> : <span> Send Reset Link </span> } </Button>  
            </div>

        </form>

        <div className='linkToSignUpOrForgotPassword'>
            <p> I don't have an account ? Click <Link to='/signup'> here </Link> to sign up </p>
        </div>   

    </section>

    </>
)
}

export default ForgotPassword