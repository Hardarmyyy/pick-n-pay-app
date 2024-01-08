import React from 'react'
import {useSelector} from 'react-redux'
import Button from '../../../../component/Button'
import { Link } from 'react-router-dom'
import { BsEyeSlash, BsEye } from "react-icons/bs";
import './LoginForm.css'



const LoginForm = ({regUser, error, invalid, handleChange, submitForm, showPassword, handleShowPassword}) => {

    const status = useSelector((state) => state.auth.status )

    return (
        <>

            <section className='loginPage'>

                <p> Login </p>

                <form className='loginForm' onSubmit={submitForm}>

                    <div>
                        <label> Username <span className='required'> * </span></label> <br />
                        <input type='text' className= {invalid?.username ? 'invalid' : null}
                        value={regUser.username} onChange={handleChange} placeholder='Enter username' name='username'/> <br /> <br />
                        {error.username && <p className='empty username'> {error.username}  </p> }
                    </div>
                
                    <div>
                        <label> Password <span className='required'> * </span></label> <br />
                        <input type={showPassword ? 'text' : 'password'}  className={invalid?.password ? 'invalid' : null}  
                        value={regUser.password} onChange={handleChange} placeholder='Enter password' name='password' /> <br />
                        {error.password && <p className='empty password'> {error.password} </p> }
                    </div>

                    <div className='button'>
                        <Button padding='5px 100px' margin='10px auto'> {status === 'Loading.......' ? <span> Logging in </span> : <span> Sign in </span>}</Button>  
                    </div>

                    <div className="passwordToggle" onClick={handleShowPassword}>
                        {showPassword ? <BsEye /> : <BsEyeSlash />}
                    </div> 

                </form>  

                <div className='linkToSignUpOrForgotPassword'>

                    <p> I don't have an account ? Click <Link to='/signup'> here </Link> to sign up </p>

                    <Link to='/forgot-password'> Forgot password </Link>

                </div>   

            </section>

        </>
    )
}

export default LoginForm