import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FETCHADDRESSLIST } from '../../../Services/addressApi'
import UseDeleteShipping from '../../../Hooks/ShippingAddress/UseDeleteShipping'
import { LuEdit } from "react-icons/lu";
import { AiFillDelete } from "react-icons/ai";

const Address = ({handleChange}) => {

const dispatch = useDispatch()
const addresses = useSelector((state) => state.address?.shippingAddress)
const userId = useSelector((state) => state.auth?.user?.userID)
const {handleDeleteAddress} = UseDeleteShipping()


useEffect(() => {
    dispatch(FETCHADDRESSLIST(userId))
}, [dispatch])

  return (

    <>
        <p className='font-Jost md:text-2xl lg:text-3xl xl:text-4xl text-blue-950'> Shipping information </p>

        {addresses.length > 0 && <p className='text-sm text-my-primary font-Montserrat'> Select your deleivery address from below </p> }
        
        <div className='w-full h-auto border rounded-md my-2 text-sm text-my-primary font-Montserrat'>

            {addresses.length > 0 
                ? 
                    <>
                        {addresses.map((address) => (
                            <div key={address._id}>
                                <label className='w-full cursor-pointer relative'>
                                    <input 
                                        className="sr-only peer" 
                                        type='radio' 
                                        value={`${address._id}`} 
                                        onChange={handleChange} 
                                        name='shippingAddressId'
                                    /> 
                                    <div className= "w-full h-auto px-2 py-1 rounded-md peer-checked:border-2 peer-checked:border-blue-950">
                                        <p> Full name: {address.fullName} </p>
                                        <p> E-mail: {address.email} </p>
                                        <p> Address: {address.streetAddress} {address.city}, {address.state} </p>
                                        <p> Phone Number: +{address.phoneNumber} </p>
                                    </div>
                                    <Link to={`/shipping-address/update/${address._id}`}> <LuEdit className='text-gray-600 text-lg absolute top-2 right-3'></LuEdit>  </Link>
                                    <AiFillDelete 
                                        onClick={() => {handleDeleteAddress(address._id)}} 
                                        className='text-crimson cursor-pointer text-lg absolute bottom-2 right-3 z-10'>
                                    </AiFillDelete>
                                </label>
                                <hr/>
                            </div>
                        ))}
                        
                    </>
                    : 
                        <div className='w-full h-32 text-center text-my-primary font-Montserrat'> 
                            <p className='font-bold text-lg mt-20'> You address list is empty </p>
                            <p> Click <Link to={`/shipping-address`} className='text-blue-600'> here </Link> to add address </p>
                        </div>
            }

        </div>
    </>
  )
}

export default Address