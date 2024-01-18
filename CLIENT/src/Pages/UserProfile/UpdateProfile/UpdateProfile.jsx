import React from 'react'
import { useEffect } from 'react'
import UseUpdateProfile from '../../../Hooks/Profile/UpdateProfile/UseUpdateProfile'
import Button from '../../../component/Button'


const UpdateProfile = () => {

const {updateProfile, error, handleChange,  handleUpdateProfile} = UseUpdateProfile()

const handleUpdateUserProfile = async (e) => {
    e.preventDefault()
    await handleUpdateProfile()
}


  return (

    <>
        <section className='w-1/2 px-10 py-2 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto md:translate-x-20 lg:translate-x-20 xl:translate-x-10 -translate-y-80'>

            <p className='text-center mb-2 font-bold font-Jost md:text-xl lg:text-2xl'> Update profile </p>

            <div className='lg:w-96 xl:w-full md:text-sm lg:text-lg mt-2'>

                <form onSubmit={handleUpdateUserProfile} className='w-full'>

                  <div className='flex justify-center items-center mb-4 relative'>
                    <label className='font-bold'> Username: </label>
                    <input 
                      type='text' 
                      className='w-full ml-2 mt-2 px-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                      name='username' 
                      value={updateProfile?.username} 
                      onChange={handleChange} 
                      maxLength={30}
                    />
                    {error && <p className='text-crimson absolute left-0 -bottom-5 text-sm'> {error.username} </p>}
                  </div>
                  

                  <div className='flex justify-center items-center my-1 relative'>
                      <label className='font-bold'> Email: </label>
                      <input 
                        type='text' 
                        className='w-full ml-2 mt-2 px-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        name='email'
                        value={updateProfile?.email} 
                        onChange={handleChange}
                        maxLength={30}
                      />
                      {error && <p className='text-crimson absolute left-0 -bottom-5 text-sm'> {error.email} </p>}
                  </div>

                  <div className='text-center'>
                      <Button margin='30px 10px'> Save changes </Button>
                  </div>

                </form>

            </div>

        </section>
    </>
  )

}

export default UpdateProfile