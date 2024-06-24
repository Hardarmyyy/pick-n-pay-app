import React from 'react'
import {useSelector} from 'react-redux'
import Button from '../../../../component/Button'
import { Link } from 'react-router-dom'
import { BsEyeSlash, BsEye } from "react-icons/bs";



const LoginForm = ({regUser, error, handleChange, submitForm, showPassword, handleShowPassword}) => {

    const status = useSelector((state) => state.auth.status )

    return (
        <>

            <section className='w-full tablet:w-4/5 mini:w-3/4 laptop:w-1/2 super:w-3/5 mx-auto'>

                <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-3 text-blue-950 font-bold text-center'> Login </p>

                <form className='w-full text-sm font-Montserrat text-my-primary bg-[#fcfcfc] rounded-md my-3 sm:px-2 md:px-4 tablet:px-4 mini:px-5 laptop:px-4 py-3' onSubmit={submitForm}>

                    <div className='relative'>
                        <label> Username <span className='text-crimson'> * </span></label>
                        <input 
                            type='text' 
                            className= 'w-full mt-1 p-2 border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                            value={regUser.username} 
                            onChange={handleChange} 
                            placeholder='Enter username' 
                            name='username'
                        />
                        {error.username && <p className='absolute text-crimson left-0'> {error.username}  </p> }
                    </div>
                
                    <div className='relative mt-3'>
                        <label> Password <span className='text-crimson'> * </span></label>
                        <input 
                            type={showPassword ? 'text' : 'password'}  
                            className= 'w-full mt-1 p-2 border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                            value={regUser.password} 
                            onChange={handleChange} 
                            placeholder='Enter password' 
                            name='password' 
                        /> 
                        {error.password && <p className='absolute text-crimson left-0'> {error.password} </p> }

                        <div className="text-lg absolute top-9 right-4 cursor-pointer" onClick={handleShowPassword}>
                            {showPassword ? <BsEye /> : <BsEyeSlash />}
                        </div> 

                    </div>

                    <div className='text-center mt-3'>
                        <Button padding='10px 60px' margin='10px auto'> {status === 'Loading.......' ? <span> Logging in </span> : <span> Sign in </span>}</Button>  
                    </div>

                </form>  

                <div className='text-center text-my-primary font-Montserrat text-sm'>

                    <p> I don't have an account ? Click <Link to='/signup' className='text-blue-600'> here </Link> to sign up </p>

                    <Link to='/forgot-password' className='text-blue-600'> Forgot password </Link>

                </div>   

            </section>

        </>
    )
}

export default LoginForm