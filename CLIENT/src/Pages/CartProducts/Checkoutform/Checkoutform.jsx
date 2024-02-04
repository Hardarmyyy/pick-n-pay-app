import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../../../component/Button'


const Checkoutform = ({userDeliveryInfo, handleUserDeliveryInfo, error, handleFormSubmit}) => {

const status = useSelector((state) => state.address?.status)
const location = useLocation()
const showCheckbox = location.pathname === '/cart'
const createAddressButton = location.pathname === '/shipping-address'

  return (

    <>
        <form className='w-full text-sm text-my-primary font-Montserrat' onSubmit={handleFormSubmit}> 

            <p className='md:text-lg lg:text-2xl text-blue-950'> Contact information</p>
            <p className='md:text-sm lg:text-lg font-semibold'> Complete the form. All field with <span className='text-crimson'> *  </span> is required. </p>

            <div className='w-full mt-2 flex justify-between'>

                <div className='w-1/2 relative mb-3 mr-2'>
                    <label> First Name <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type='text' 
                        className='w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.firstName} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='Enter your first name' 
                        name='firstName' 
                        maxLength={30}
                    />
                    {error && <p className='text-crimson font-Jost absolute left-0 -bottom-5'> {error.firstName} </p>}
                </div>

                <div className='w-1/2 relative mb-3'>
                    <label> Last Name <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type='text' 
                        className='w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.lastName} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='Enter your last name' 
                        name='lastName' maxLength={30}
                    />
                    {error && <p className='text-crimson font-Jost absolute left-0 -bottom-5'> {error.lastName} </p>}
                </div>
            </div>

            <div className='w-full mt-2 flex justify-between'>
                <div className='w-1/2 relative mr-2'>
                    <label> Email Address <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type='text' 
                        className='w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.email}
                        onChange={handleUserDeliveryInfo} 
                        placeholder='user@example.com' 
                        name='email'
                    />
                    {error && <p className='text-crimson font-Jost absolute left-0 -bottom-5'> {error.email} </p>}
                </div>

                <div className='w-1/2 relative'>
                    <label> Phone Number <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type='text' 
                        className='w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.phoneNumber} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='234 800 000 0000' 
                        name='phoneNumber'
                    />
                    {error && <p className='text-crimson font-Jost absolute left-0 -bottom-5'> {error.phoneNumber} </p>}
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
                {error && <p className='text-crimson font-Jost absolute left-0 -bottom-5'> {error.streetAddress} </p>}
            </div>

            <div className='w-full flex justify-between'>

                <div className='w-1/3 relative mr-2'>
                    <label> City <span className='text-crimson'> * </span> </label> <br />
                    <input 
                        type='text' 
                        className='w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.city} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='Enter city' 
                        name='city'
                    />
                    {error && <p className='text-crimson font-Jost absolute left-0 -bottom-5'> {error.city} </p>}
                </div>

                <div className='w-1/3 relative mr-2'>
                    <label> State <span className='text-crimson'> * </span> </label> <br />
                    <input 
                        type='text'
                        className='w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.state} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='Enter state' 
                        name='state'
                    />
                    {error && <p className='text-crimson font-Jost absolute left-0 -bottom-5'> {error.state} </p>}
                </div>

                <div className='w-1/3 relative'>
                    <label> Zip code </label> <br />
                    <input 
                        type='text' 
                        className='w-full mt-1 p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                        value={userDeliveryInfo.zipcode} 
                        onChange={handleUserDeliveryInfo} 
                        placeholder='00000' 
                        name='zipcode'
                    />
                </div>

            </div>

            {showCheckbox && 
                <div className='w-full mt-6'>
                    <input 
                        type='checkbox' 
                        className='mr-2'
                        checked={userDeliveryInfo.isShipping} 
                        onChange={handleUserDeliveryInfo}
                        name='isShipping'
                    /> 
                    <label className='text-sm'> I have an existing shipping information </label>
                </div>
            }

            <div className='text-center'> 
                {showCheckbox 
                    ?   <Button margin='20px 0px' padding='5px 70px'> Proceed to payment </Button> 
                        : createAddressButton 
                            ? <Button margin='30px 0px' padding='5px 70px'> {status === 'Loading.......' ? <span> Creating ... </span> : <span> Create address </span>}  </Button>
                                : <Button margin='30px 0px' padding='5px 70px'> {status === 'Loading.......' ? <span> Updating ... </span> : <span> Update address </span>} </Button>
                }
            </div>

        </form>
    </>
  )
}

export default Checkoutform