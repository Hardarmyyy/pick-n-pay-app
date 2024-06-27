import React from 'react'
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Button from '../../../../component/Button'


const ResetPasswordForm = ({verifyResetStatus, user, error, handleChange, submitForm, showPassword, handleShowPassword, showConfirmPassword, handleShowConfirmPassword}) => {

return (

    <>
        <div className='w-full tablet:w-4/5 mini:w-3/4 laptop:w-1/2 super:w-3/5 mx-auto flex flex-col justify-center items-center'>

            <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-3 text-blue-950 font-bold text-center'> Reset Password </p>

            <form className='w-full text-sm font-Montserrat text-my-primary bg-[#fcfcfc] rounded-md my-3 sm:px-2 md:px-4 tablet:px-4 mini:px-5 laptop:px-4 py-3' onSubmit={submitForm}>

                <div className='relative'>
                    <label> Password  <span className='text-crimson'> * </span></label>
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        className= 'w-full mt-1 p-2 border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                        value={user.password} 
                        onChange={handleChange} 
                        name="password" 
                        placeholder="Enter password"
                        maxLength={22}
                    />
                    {error.password && <p className='absolute text-crimson left-0'> {error.password}  </p> }

                    <div className="text-lg absolute top-9 right-4 cursor-pointer" onClick={handleShowPassword}>
                        {showPassword ? <BsEye /> : <BsEyeSlash />} 
                    </div>

                </div>

                <div className='relative mt-3'>
                    <label> Confirm Password  <span className='text-crimson'> * </span></label>
                    <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        className= 'w-full mt-1 p-2 border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                        value={user.confirmPassword} 
                        onChange={handleChange} 
                        name="confirmPassword" 
                        placeholder="Confirm password"
                        maxLength={22}
                    />
                    {error.confirmPassword && <p className='absolute text-crimson left-0'> {error.confirmPassword} </p> }

                    <div className="text-lg absolute top-9 right-4 cursor-pointer" onClick={handleShowConfirmPassword}>
                        {showConfirmPassword ? <BsEye /> : <BsEyeSlash />} 
                    </div>

                </div>

                <div className='text-center mt-3'>
                    <Button padding='10px 60px' margin='10px auto'> {verifyResetStatus === 'Loading...' ? <span> Updating </span> : <span> Reset </span>} </Button>  
                </div>

            </form>

        </div>

    </>
)
}

export default ResetPasswordForm