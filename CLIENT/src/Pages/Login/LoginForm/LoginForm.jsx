import React from 'react'
import './LoginForm.css'
import Button from '../../../component/Button'
import { Link } from 'react-router-dom'
import { BsEyeSlash, BsEye } from "react-icons/bs";



const LoginForm = ({regUser, error, invalid, handleChange, submitForm, showPassword, handleShowPassword, status}) => {

    return (
        <>

            <section className='loginPage'>

                <p> Login </p>

                <form className='loginForm' onSubmit={submitForm}>

                    <div>
                        <label> Username <span className='required'> * </span></label> <br />
                        <input type='text' className= {invalid?.username ? 'invalid' : null}
                        value={regUser.username.trim()} onChange={handleChange} placeholder='Enter username' name='username'/> <br /> <br />
                        {error.username && <p className='empty username'> {error.username}  </p> }
                    </div>
                
                    <div>
                        <label> Password <span className='required'> * </span></label> <br />
                        <input type={showPassword ? 'text' : 'password'}  className={invalid?.password ? 'invalid' : null}  
                        value={regUser.password.trim()} onChange={handleChange} placeholder='Enter password' name='password' /> <br />
                        {error.password && <p className='empty password'> {error.password} </p> }
                    </div>

                    <div className='button'>
                        {status === 'Loading.......' ? 
                                            <Button padding='5px 100px' margin='10px auto'> Logging in </Button>  
                                            :  <Button padding='5px 100px' margin='30px auto'> Sign in </Button>
                        }
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