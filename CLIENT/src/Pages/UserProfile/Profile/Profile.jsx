import React from 'react'
import { useSelector } from 'react-redux';


const Profile = () => {

const currentUser = useSelector((state) => state?.user?.user)
const buyer = currentUser?.userRole[0]
const seller = currentUser?.userRole[0]

  return (
    <>
            <section className='w-full tablet:w-3/4 mini:w-3/5 laptop:w-1/2 super:w-3/5 mx-auto'>

                <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-2 text-blue-950 font-bold text-center'> User Information </p>

                <form className='w-full h-auto text-sm font-Montserrat text-my-primary bg-[#fcfcfc] rounded-md py-3 sm:px-2 md:px-4 tablet:px-4 mini:px-5 laptop:px-4 flex flex-col justify-center items-center'>

                    <div className='w-full flex justify-between items-center mt-2'>
                        <label className='font-bold text-sm flex-shrink-0'> Usertype: </label>
                        <input 
                            type="text" 
                            value={buyer ? buyer : seller} 
                            disabled
                            className='w-full border rounded-md shadow-sm text-sm ms-2 bg-white placeholder:italic placeholder:text-slate-400'
                        />
                    </div>

                    <div className='w-full flex justify-between items-center mt-2'>
                        <label className='font-bold text-sm flex-shrink-0'> Username: </label>
                        <input 
                            type="text" 
                            value={currentUser?.username} 
                            disabled
                            className='w-full border rounded-md shadow-sm text-sm ms-2 bg-white placeholder:italic placeholder:text-slate-400'
                        />
                    </div>

                    <div className='w-full flex justify-between items-center mt-2'>
                        <label className='font-bold text-sm flex-shrink-0'> Email: </label>
                        <input 
                            type="text" 
                            value={currentUser?.email} 
                            disabled
                            className='w-full border rounded-md shadow-sm text-sm ms-2 bg-white placeholder:italic placeholder:text-slate-400'
                        />
                    </div>
                    
                </form>

            </section>
    </>
  )
}

export default Profile