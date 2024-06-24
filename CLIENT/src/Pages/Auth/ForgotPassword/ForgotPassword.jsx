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

    <div className='tablet:mt-4 mini:mt-4 laptop:mt-4 super:mt-4 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 sticky top-0 left-0 z-50 bg-white'>
        <Logo></Logo>
    </div>

    <section className='w-full sm:h-4/5 md:h-4/5 tablet:min-h-screen mini:min-h-screen laptop:min-h-screen super:min-h-screen py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex justify-center items-center'>

        <div className='w-full tablet:w-4/5 mini:w-3/4 laptop:w-1/2 super:w-3/5 mx-auto'>

            <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-3 text-blue-950 font-bold text-center'> Forgot Password </p>

            <form onSubmit={submitForm} className='w-full text-sm font-Montserrat text-my-primary bg-[#fcfcfc] rounded-md my-3 sm:px-2 md:px-4 tablet:px-4 mini:px-5 laptop:px-4 py-3'>

                <div className='relative'>

                    <label> Email address <span className='text-crimson'> * </span></label> <br />

                    <input 
                        type="text" 
                        className= 'w-full mt-2 p-2 border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950' 
                        value={user.email} 
                        onChange={handleChange} 
                        name="email" 
                        placeholder="Enter your registered email address"
                    />

                    {error.email && <p className='text-crimson absolute left-0 mt-1'> {error.email}  </p> }

                </div>

                <div className='text-center mt-4 text-sm'>
                    <Button padding='10px 60px' margin='10px auto'> {status === 'Loading.......' ? <span> Sending </span> : <span> Send Reset Link </span> } </Button>  
                </div>

            </form>

            <p className='text-center text-my-primary font-Montserrat text-sm'> I don't have an account ? Click <Link to='/signup' className='text-blue-600'> here </Link> to sign up </p>

        </div>

    </section>

    </>
)
}

export default ForgotPassword