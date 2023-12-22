import React from 'react'
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Button from '../../../component/Button'
import './ResetPasswordForm.css'

const ResetPasswordForm = ({status, user, invalid, error, handleChange, submitForm, showPassword, handleShowPassword, showConfirmPassword, handleShowConfirmPassword}) => {


return (

    <>
        <section className='resetFormContainer'>

            <div className='resetformHeader'>
                <h2> Reset Password </h2>
            </div>

            <form className='resetForm' onSubmit={submitForm}>

                <div>
                    <label> Password  <span className='required'> * </span></label> <br />
                    <input type={showPassword ? 'text' : 'password'} className= {invalid?.password ? 'invalid' : null} 
                    value={user.password} onChange={handleChange} name="password" placeholder="Enter password"/> <br /> <br />
                    {error.password && <p className='empty password'> {error.password}  </p> }
                </div>

                <div>
                    <label> Confirm Password  <span className='required'> * </span></label> <br />
                    <input type={showConfirmPassword ? 'text' : 'password'} className={invalid?.confirmPassword ? 'invalid' : null} 
                    value={user.confirmPassword} onChange={handleChange} name="confirmPassword" placeholder="Confirm password"/> <br /> <br />
                    {error.confirmPassword && <p className='empty confirmPassword'> {error.confirmPassword} </p> }
                </div>

                <div className='button'>
                    <Button padding='5px 100px' margin='10px auto'> {status === 'Loading.......' ? <span> Loading </span> : <span> Reset </span>} </Button>  
                </div>

                <div className="passwordToggle" onClick={handleShowPassword}>
                    {showPassword ? <BsEye /> : <BsEyeSlash />} 
                </div>

                <div className="confirmPasswordToggle" onClick={handleShowConfirmPassword}>
                    {showConfirmPassword ? <BsEye /> : <BsEyeSlash />} 
                </div>

            </form>

        </section>

    </>
)
}

export default ResetPasswordForm