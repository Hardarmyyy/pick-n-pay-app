import React from 'react'
import {useSelector} from 'react-redux'
import Button from '../../../../component/Button'
import { Link } from 'react-router-dom'
import { BsEyeSlash, BsEye } from "react-icons/bs";



const LoginForm = ({regUser, error, handleChange, submitForm, showPassword, handleShowPassword}) => {

    const status = useSelector((state) => state.auth.status )

    return (
        <>

            <section className='w-96 h-auto mx-auto translate-y-10'>

                <p className='font-Jost md:text-xl lg:text-3xl mb-3 text-blue-950 font-bold'> Login </p>

                <form className='w-full text-sm font-Montserrat text-my-primary' onSubmit={submitForm}>

                    <div>
                        <label> Username <span className='text-crimson'> * </span></label>
                        <input 
                            type='text' 
                            className= 'w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
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
                            className= 'w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                            value={regUser.password} 
                            onChange={handleChange} 
                            placeholder='Enter password' 
                            name='password' 
                        /> 
                        {error.password && <p className='absolute text-crimson left-0'> {error.password} </p> }

                        <div className="text-lg absolute top-8 right-4 cursor-pointer" onClick={handleShowPassword}>
                            {showPassword ? <BsEye /> : <BsEyeSlash />}
                        </div> 

                    </div>

                    <div className='text-center mt-3'>
                        <Button padding='5px 60px' margin='10px auto'> {status === 'Loading.......' ? <span> Logging in </span> : <span> Sign in </span>}</Button>  
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