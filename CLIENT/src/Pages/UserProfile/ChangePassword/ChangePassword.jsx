import React from 'react'
import UseChangePassword from '../../../Hooks/Profile/ChangePassword/UseChangePassword'
import Button from '../../../component/Button'

const ChangePassword = () => {

const {updatePassword, error, handleChange, showPassword, handleShowPassword, handleUpdatePassword} = UseChangePassword()

const submitUpdatePassword = async (e) => {
    e.preventDefault()
    await handleUpdatePassword()
}


  return (
    <>
        <section className='w-1/2 px-10 py-2 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto md:translate-x-20 lg:translate-x-20 xl:translate-x-10 -translate-y-80'>

            <p className='text-center mb-2 font-bold font-Jost md:text-xl lg:text-2xl'> Change password </p>

            <div className='lg:w-96 xl:w-full md:text-sm lg:text-lg mt-2'>

                <form onSubmit={submitUpdatePassword} className='w-full'>

                    <div className='flex justify-center items-center'>
                        <label className='font-bold'> Current password: </label>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            className='w-full ml-2 mt-2 px-2 border rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400'
                            name='currentPassword' 
                            value={updatePassword.currentPassword} 
                            onChange={handleChange} 
                            maxLength={30}
                        />
                        {error && <p> {error.currentPassword} </p>}
                    </div>

                    <div className='flex justify-center items-center my-2'>
                        <label className='font-bold'> New password: </label>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            className='w-full ml-2 mt-2 px-2 border rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400'
                            name='newPassword' 
                            value={updatePassword.newPassword} 
                            onChange={handleChange} 
                            maxLength={30}
                        />
                        {error && <p> {error.newPassword} </p>}
                    </div>

                    <div className='flex justify-center items-center my-2'>
                        <label className='font-bold'> Confirm new password: </label>
                        <input 
                            type='password' 
                            className='w-full ml-2 mt-2 px-2 border rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400'
                            name='confirmPassword' 
                            value={updatePassword.confirmPassword} 
                            onChange={handleChange} 
                            maxLength={30}
                        />
                        {error && <p> {error.confirmPassword} </p>}
                    </div>

                    <div className='text-center'>
                        <Button margin='30px 10px'> Update password </Button>
                    </div>

                </form>

            </div>

        </section>
    </>
  )
}

export default ChangePassword