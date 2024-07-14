import React from 'react'
import UseUpdateProfile from '../../../Hooks/Profile/UpdateProfile/UseUpdateProfile'
import Button from '../../../component/Button'


const UpdateProfile = () => {

const {status, updateProfile, error, handleChange,  handleUpdateProfile} = UseUpdateProfile()

const handleUpdateUserProfile = async (e) => {
    e.preventDefault()
    await handleUpdateProfile()
}


  return (

    <>
        <section className='w-full tablet:w-3/4 mini:w-3/5 laptop:w-1/2 super:w-3/5 mx-auto'>

            <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-2 text-blue-950 font-bold text-center'> Update profile </p>

            <form onSubmit={handleUpdateUserProfile} className='w-full h-auto text-sm font-Montserrat text-my-primary bg-[#fcfcfc] rounded-md py-3 sm:px-2 md:px-4 tablet:px-4 mini:px-5 laptop:px-4 flex flex-col justify-center items-center'>

              <div className='w-full mt-2'>

                <div className='flex justify-between items-center'>
                  <label className='font-bold text-sm flex-shrink-0'> Username: </label>
                  <div className='w-full relative'>
                    <input 
                      type='text' 
                      className='w-full px-2 ms-2 text-sm border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                      name='username' 
                      value={updateProfile?.username} 
                      onChange={handleChange} 
                      maxLength={16}
                    />
                    {error && <p className='text-crimson absolute left-0 ms-2 text-sm'> {error.username} </p>}
                  </div>
                </div>

              </div>
              
              <div className='w-full mt-4'>

                <div className='flex justify-between items-center'>
                  <label className='font-bold text-sm flex-shrink-0'> Email: </label>
                  <div className='w-full relative'>
                    <input 
                        type='text' 
                        className='w-full px-2 ms-2 text-sm border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                        name='email'
                        value={updateProfile?.email} 
                        onChange={handleChange}
                        maxLength={30}
                      />
                      {error && <p className='text-crimson absolute left-0 ms-2 text-sm'> {error.email} </p>}
                    </div>
                </div>

              </div>

              <div className='text-center mt-3'>
                  <Button margin='15px 10px' padding='5px 50px'> {status === 'Loading.......' ? <span> Updating </span> : <span> Save changes </span> } </Button>
              </div>

            </form>

        </section>
    </>
  )

}

export default UpdateProfile