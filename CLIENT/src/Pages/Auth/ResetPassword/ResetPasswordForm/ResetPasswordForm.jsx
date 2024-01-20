import React from 'react'
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Button from '../../../../component/Button'


const ResetPasswordForm = ({status, user, error, handleChange, submitForm, showPassword, handleShowPassword, showConfirmPassword, handleShowConfirmPassword}) => {

return (

    <>
        <section className='w-96 h-auto mx-auto md:translate-y-10 lg:translate-y-14'>

            <p className='font-Jost md:text-xl lg:text-3xl mb-3 text-blue-950 font-bold'> Reset Password </p>

            <form className='w-full text-sm font-Montserrat text-my-primary' onSubmit={submitForm}>

                <div className='relative'>
                    <label> Password  <span className='text-crimson'> * </span></label>
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        className= 'w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={user.password} 
                        onChange={handleChange} 
                        name="password" 
                        placeholder="Enter password"
                        maxLength={22}
                    />
                    {error.password && <p className='absolute text-crimson left-0'> {error.password}  </p> }

                    <div className="text-lg absolute top-8 right-4 cursor-pointer" onClick={handleShowPassword}>
                        {showPassword ? <BsEye /> : <BsEyeSlash />} 
                    </div>

                </div>

                <div className='relative mt-3'>
                    <label> Confirm Password  <span className='text-crimson'> * </span></label>
                    <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        className='w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={user.confirmPassword} 
                        onChange={handleChange} 
                        name="confirmPassword" 
                        placeholder="Confirm password"
                        maxLength={22}
                    />
                    {error.confirmPassword && <p className='absolute text-crimson left-0'> {error.confirmPassword} </p> }

                    <div className="text-lg absolute top-8 right-4 cursor-pointer" onClick={handleShowConfirmPassword}>
                        {showConfirmPassword ? <BsEye /> : <BsEyeSlash />} 
                    </div>

                </div>

                <div className='text-center mt-3'>
                    <Button padding='5px 60px' margin='10px auto'> {status === 'Loading.......' ? <span> Loading </span> : <span> Reset </span>} </Button>  
                </div>

            </form>

        </section>

    </>
)
}

export default ResetPasswordForm