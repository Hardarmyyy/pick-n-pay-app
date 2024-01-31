import React from 'react'
import UseChangePassword from '../../../Hooks/Profile/ChangePassword/UseChangePassword'
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Button from '../../../component/Button'

const ChangePassword = () => {

const {status, updatePassword, error, handleChange, showCurrentPassword,  showNewPassword, showConfirmPassword, handleShowCurrentPassword, handleShowNewPassword, handleShowConfirmPassword, handleUpdatePassword} = UseChangePassword()

const submitUpdatePassword = async (e) => {
    e.preventDefault()
    await handleUpdatePassword()
}


  return (
    <>
        <section className='lg:w-1/2 xl:w-1/2 md:px-2 lg:px-6 py-2 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto translate-y-0'>

            <p className='text-center mb-2 font-bold font-Jost md:text-xl lg:text-2xl'> Change password </p>

            <div className='w-full md:text-sm text-lg mt-2'>

                <form onSubmit={submitUpdatePassword} className='w-full'>

                    <div className='flex md:px-1 md:justify-between lg:justify-between xl:justify-start items-center relative'>
                        <label className='font-bold'> Current password: </label>

                        <input 
                            type={showCurrentPassword ? 'text' : 'password'} 
                            className='md:w-56 lg:w-72 xl:w-3/4 ml-2 mt-2 px-2 py-1 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                            name='currentPassword' 
                            value={updatePassword.currentPassword} 
                            onChange={handleChange} 
                            maxLength={22}
                        />
                        {error && <p className='absolute left-1 -bottom-5 text-crimson text-sm'> {error.currentPassword} </p>}

                        <div className="text-lg absolute bottom-2 md:right-3 lg:right-5 xl:right-8 cursor-pointer" onClick={handleShowCurrentPassword}>
                            {showCurrentPassword ? <BsEye /> : <BsEyeSlash />} 
                        </div>
                    </div>

                    <div className='flex md:px-1  md:justify-between lg:justify-between xl:justify-start items-center mt-4 relative'>
                        <label className='font-bold'> New password: </label>

                        <input 
                            type={showNewPassword ? 'text' : 'password'}
                            className='md:w-56 lg:w-72 xl:w-3/4 md:ml-0 lg:ml-8 mt-2 px-2 py-1 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                            name='newPassword' 
                            value={updatePassword.newPassword} 
                            onChange={handleChange} 
                            maxLength={22}
                        />
                        {error && <p className='absolute left-1 -bottom-5 text-crimson text-sm'> {error.newPassword} </p>}

                        <div className="text-lg absolute bottom-2 md:right-3  lg:right-5 xl:right-8 cursor-pointer" onClick={handleShowNewPassword}>
                            {showNewPassword ? <BsEye /> : <BsEyeSlash />} 
                        </div>
                    </div>

                    <div className='flex md:px-1  md:justify-between lg:justify-between xl:justify-start items-center mt-4 relative'>
                        <label className='font-bold'> Confirm password: </label>

                        <input 
                            type={showConfirmPassword ? 'text' : 'password'}
                            className='md:w-56 lg:w-72 xl:w-3/4 md:ml-0 lg:ml-2 mt-2 px-2 py-1 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                            name='confirmPassword' 
                            value={updatePassword.confirmPassword} 
                            onChange={handleChange} 
                            maxLength={22}
                        />
                        {error && <p className='absolute left-1 -bottom-5 text-crimson text-sm'> {error.confirmPassword} </p>}

                        <div className="text-lg absolute bottom-2 md:right-3  lg:right-5 xl:right-8 cursor-pointer" onClick={handleShowConfirmPassword}>
                            {showConfirmPassword ? <BsEye /> : <BsEyeSlash />} 
                        </div>
                    </div>

                    <div className='text-center md:text-sm lg:text-lg'>
                        <Button margin='30px 10px'> {status === 'Loading.......' ? <span> Updating </span> : <span> Update password </span>} </Button>
                    </div>

                </form>

            </div>

        </section>
    </>
  )
}

export default ChangePassword