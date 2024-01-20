import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SINGLEUSER } from '../../../Services/userApi';


const Profile = () => {

const currentUser = useSelector((state) => state.auth?.user)
const buyer = currentUser?.userRole[0]
const seller = currentUser?.userRole[0]

const dispatch = useDispatch()
const id = useSelector((state) => state.auth?.user?.userID)


useEffect(() => {
    dispatch(SINGLEUSER(id))
}, [dispatch])


  return (
    <>
            <section className='w-1/2 p-10 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto md:translate-x-20 lg:translate-x-20 xl:translate-x-10 -translate-y-80'>

                <p className='text-center mb-2 font-bold font-Jost md:text-xl lg:text-2xl'> User Information </p>

                <div className='lg:w-96 xl:w-full md:text-sm lg:text-lg mt-2'>

                    <form className='w-full'>
                        <div className='flex justify-center items-center'>
                            <label className='font-bold'> Usertype: </label>
                            <input 
                                type="text" 
                                value={buyer ? buyer : seller} 
                                disabled
                                className='w-full ml-2 mt-2 px-2 border rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400'
                            />
                        </div>
                        <div className='flex justify-between items-center'>
                            <label className='font-bold'> Username: </label>
                            <input 
                                type="text" 
                                value={currentUser?.userName} 
                                disabled
                                className='w-full ml-2 mt-2 px-2 border rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400'
                            />
                        </div>
                        <div className='flex justify-between items-center'>
                            <label className='font-bold'> Email: </label>
                            <input 
                                type="text" 
                                value={currentUser?.email} 
                                disabled
                                className='w-full ml-2 mt-2 px-2 border rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400'
                            />
                        </div>
                        
                    </form>

                </div>

            </section>
    </>
  )
}

export default Profile