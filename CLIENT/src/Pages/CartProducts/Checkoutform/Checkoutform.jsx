import React from 'react'
import Button from '../../../component/Button'


const Checkoutform = ({userDeliveryInfo, handleUserDeliveryInfo, error, handleFormSubmit}) => {


  return (

    <>
        <form className='w-full text-sm text-my-primary font-Montserrat' onSubmit={handleFormSubmit}> 

            <p className='md:text-lg lg:text-2xl text-blue-950'> Contact information</p>
            <p className='md:text-sm lg:text-lg font-semibold'> Complete the form. All field with <span className='text-crimson'> *  </span> is required. </p>

            <div className='w-full mt-2 flex justify-between flex-wrap'>

                <div className='relative mb-3'>
                    <label> First Name <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type='text' 
                        className='md:w-44 lg:w-60 xl:w-80 mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.firstName} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='Enter your first name' 
                        name='firstName' 
                        maxLength={30}
                    />
                    {error && <p className='text-crimson absolute left-0 -bottom-5'> {error.firstName} </p>}
                </div>

                <div className='relative mb-3'>
                    <label> Last Name <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type='text' 
                        className='md:w-44 lg:w-60 xl:w-80 mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.lastName} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='Enter your last name' 
                        name='lastName' maxLength={30}
                    />
                    {error && <p className='text-crimson absolute left-0 -bottom-5'> {error.lastName} </p>}
                </div>

                <div className='relative'>
                    <label> Email Address <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type='text' 
                        className='md:w-44 lg:w-60 xl:w-80 mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.email}
                        onChange={handleUserDeliveryInfo} 
                        placeholder='user@example.com' 
                        name='email'
                    />
                    {error && <p className='text-crimson absolute left-0 -bottom-5'> {error.email} </p>}
                </div>

                <div className='relative'>
                    <label> Phone Number <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type='text' 
                        className='md:w-44 lg:w-60 xl:w-80 mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.phoneNumber} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='234 800 000 0000' 
                        name='phoneNumber'
                    />
                    {error && <p className='text-crimson absolute left-0 -bottom-5'> {error.phoneNumber} </p>}
                </div>

            </div>

            <p className='md:text-lg lg:text-2xl mt-3 text-blue-950'> Delivery information </p>

            <div className='w-full relative mb-3'>
                <label> Street address <span className='text-crimson'> * </span></label> <br />
                <input 
                    type='text' 
                    className='w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                    value={userDeliveryInfo.streetAddress} 
                    onChange={handleUserDeliveryInfo} 
                    placeholder='Enter your address' 
                    name='streetAddress'
                />
                {error && <p className='text-crimson absolute left-0 -bottom-5'> {error.streetAddress} </p>}
            </div>

            <div className='flex justify-between'>

                <div className='relative'>
                    <label> City <span className='text-crimson'> * </span> </label> <br />
                    <input 
                        type='text' 
                        className='md:w-28 lg:w-40 xl:w-52 mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.city} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='Enter city' 
                        name='city'
                    />
                    {error && <p className='text-crimson absolute left-0 -bottom-5'> {error.city} </p>}
                </div>

                <div className='relative'>
                    <label> State <span className='text-crimson'> * </span> </label> <br />
                    <input 
                        type='text'
                        className='md:w-28 lg:w-40 xl:w-52 mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.state} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='Enter state' 
                        name='state'
                    />
                    {error && <p className='text-crimson absolute left-0 -bottom-5'> {error.state} </p>}
                </div>

                <div className=''>
                    <label> Zip code </label> <br />
                    <input 
                        type='text' 
                        className='md:w-28 lg:w-40 xl:w-52 mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.zipcode} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='00000' 
                        name='zipcode'
                    />
                </div>

            </div>

            <div className='mt-4'>
                <input 
                    type='checkbox' 
                    className='mr-2'
                    checked={userDeliveryInfo.isShipping} 
                    onChange={handleUserDeliveryInfo}
                    name='isShipping'
                /> 
                <label> I have an existing shipping address and information </label>
            </div>

            <div className='text-center'> 
                <Button margin='20px 0px' padding='5px 70px'> Proceed to payment </Button>
            </div>

        </form>
    </>
  )
}

export default Checkoutform