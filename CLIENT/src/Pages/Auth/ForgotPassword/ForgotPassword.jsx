import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../../../Layouts/Logo/Logo'
import Button from '../../../component/Button'
import UseForgotPassword from '../../../Hooks/Auth/ForgotPassword/UseForgotPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {

const status = useSelector((state) => state.auth.status )

//import and use the forgotPassword hook;
const {user, error, handleChange, handleForgotPassword} = UseForgotPassword()

// define a state to handle form submission
const submitForm = (e) => {
    e.preventDefault()

    handleForgotPassword()
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

    <div className='p-4'>
        <Logo></Logo>
    </div>

    <section className='w-96 h-auto mx-auto md:translate-y-10 lg:translate-y-20'>

        <p className='font-Jost md:text-xl lg:text-3xl mb-3 text-blue-950 font-bold'> Forgot Password </p>

        <form onSubmit={submitForm} className='w-full relative text-sm font-Montserrat text-my-primary'>

            <label> Email address <span className='text-crimson'> * </span></label> <br />

            <input 
                type="text" 
                className= 'w-full mt-2 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950' 
                value={user.email} 
                onChange={handleChange} 
                name="email" 
                placeholder="Enter your registered email address"
            />

            {error.email && <p className='text-crimson absolute left-0 mt-1'> {error.email}  </p> }

            <div className='text-center mt-4 text-sm'>
                <Button padding='5px 60px' margin='10px auto'> {status === 'Loading.......' ? <span> Sending </span> : <span> Send Reset Link </span> } </Button>  
            </div>

        </form>

        <p className='text-center text-my-primary font-Montserrat text-sm'> I don't have an account ? Click <Link to='/signup' className='text-blue-600'> here </Link> to sign up </p>

    </section>

    </>
)
}

export default ForgotPassword