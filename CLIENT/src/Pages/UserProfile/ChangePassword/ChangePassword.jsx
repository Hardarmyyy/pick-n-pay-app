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
        <section className='w-full tablet:w-3/4 mini:w-3/5 laptop:w-1/2 super:w-3/5 mx-auto'>

            <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-2 text-blue-950 font-bold text-center'> Change password </p>

            <form onSubmit={submitUpdatePassword} className='w-full h-auto text-sm font-Montserrat text-my-primary bg-[#fcfcfc] rounded-md py-3 sm:px-2 md:px-4 tablet:px-4 mini:px-5 laptop:px-4 flex flex-col justify-center items-center'>

                <div className='w-full mt-2'>

                    <div className='flex justify-between items-center'>

                        <label className='font-bold text-sm flex-shrink-0'> Current password: </label>
                        <div className='w-full relative'>
                            <input 
                                type={showCurrentPassword ? 'text' : 'password'} 
                                className='w-full px-2 ms-2 text-sm border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                                name='currentPassword' 
                                value={updatePassword.currentPassword} 
                                onChange={handleChange} 
                                maxLength={22}
                            />
                            {error && <p className='text-crimson absolute left-0 ms-2 text-sm'> {error.currentPassword} </p>}

                            <div className="text-lg absolute top-2 right-0 cursor-pointer" onClick={handleShowCurrentPassword}>
                                {showCurrentPassword ? <BsEye /> : <BsEyeSlash />} 
                            </div>
                        </div>

                    </div>

                </div>

                <div className='w-full mt-4'>

                    <div className='flex justify-between items-center'> 

                        <label className='font-bold text-sm flex-shrink-0'> New password: </label>
                        <div className='w-full relative'>
                            <input 
                                type={showNewPassword ? 'text' : 'password'}
                                className='w-full px-2 ms-2 text-sm border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                                name='newPassword' 
                                value={updatePassword.newPassword} 
                                onChange={handleChange} 
                                maxLength={22}
                            />
                            {error && <p className='text-crimson absolute left-0 ms-2 text-sm'> {error.newPassword} </p>}

                            <div className="text-lg absolute top-2 right-0 cursor-pointer" onClick={handleShowNewPassword}>
                                {showNewPassword ? <BsEye /> : <BsEyeSlash />} 
                            </div>
                        </div>

                    </div>

                </div>

                <div className='w-full mt-4'>

                    <div className='flex justify-between items-center'>

                        <label className='font-bold text-sm flex-shrink-0'> Confirm password: </label>
                        <div className='w-full relative'>
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'}
                                className='w-full px-2 ms-2 text-sm border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                                name='confirmPassword' 
                                value={updatePassword.confirmPassword} 
                                onChange={handleChange} 
                                maxLength={22}
                            />
                            {error && <p className='text-crimson absolute left-0 ms-2 text-sm'> {error.confirmPassword} </p>}

                            <div className="text-lg absolute top-2 right-0 cursor-pointer" onClick={handleShowConfirmPassword}>
                                {showConfirmPassword ? <BsEye /> : <BsEyeSlash />} 
                            </div>
                        </div>

                    </div>

                </div>

                <div className='text-center mt-3'>
                    <Button margin='15px 10px' padding='5px 50px'> {status === 'Loading.......' ? <span> Updating </span> : <span> Update password </span>} </Button>
                </div>

            </form>

        </section>
    </>
  )
}

export default ChangePassword