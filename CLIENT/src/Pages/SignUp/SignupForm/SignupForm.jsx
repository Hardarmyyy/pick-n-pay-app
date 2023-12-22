import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../../component/Button'
import { BsEyeSlash, BsEye } from "react-icons/bs";
import './SignupForm.css'

const SignupForm = ({newUser, error, invalid, handleChange, submitForm, showPassword, handleShowPassword}) => {

const status = useSelector((state) => state.auth.status)

return (

    <>
        <section className='signUpContainer'> 

            <div className='signUpformHeader'>
                <h2> Sign up </h2>
            </div>

            <form className='registerForm' onSubmit={submitForm}> 
                <div>
                    {error.userRole && <p className='empty userRole'> {error.userRole}  </p> }
                    <div className='userSelect'>
                        <div className='buyer'>
                            <label> <input type='radio' value='buyer' checked={newUser.userRole === 'buyer'} onChange={handleChange} name='userRole'/> I am a buyer </label> 
                        </div>

                        <div className='seller'>
                            <label> <input type='radio' value='seller' checked={newUser.userRole === 'seller'} onChange={handleChange} name='userRole'/> I am a seller </label> 
                        </div>
                    </div>
                </div>

                <div>
                    <label> Username <span className='required'> * </span></label> <br />
                    <input type="text" className= {invalid.username ? 'invalid' : null} 
                    value={newUser.username} onChange={handleChange} name="username" placeholder="Enter username"/> <br /> <br />
                    {error.username && <p className='empty username'> {error.username}  </p> }
                </div>

                <div>
                    <label> Email address <span className='required'> * </span></label> <br />
                    <input type="text" className= {invalid.email ? 'invalid' : null} 
                    value={newUser.email} onChange={handleChange} name="email" placeholder="Enter email address"/> <br /> <br />
                    {error.email && <p className='empty email'> {error.email}  </p> }
                </div>

                <div>
                    <label> Password  <span className='required'> * </span></label> <br />
                    <input type={showPassword ? 'text' : 'password'} className={invalid.password ? 'invalid' : null} 
                    value={newUser.password} onChange={handleChange} name="password" placeholder="Enter password"/> <br /> <br />
                    {error.password && <p className='empty pass'> {error.password} </p> }
                </div>

                <div className='button'>
                    <Button padding='5px 100px'> {status === 'Loading.......' ? <span> Signin up </span> : <span> Get Started</span>  } </Button> 
                </div>
                
                <div className="passwordToggle" onClick={handleShowPassword}>
                    {showPassword ? <BsEye /> : <BsEyeSlash />} 
                </div>

            </form>   

            <div className='linkToLogin'>

                <p> Already have an account ? Click <Link to='/login'> here </Link> to login</p>

            </div>  

        </section>
    </>
)
}

export default SignupForm