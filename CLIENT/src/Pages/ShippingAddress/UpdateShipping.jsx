import React from 'react'
import { useParams } from 'react-router-dom'
import Checkoutform from '../CartProducts/Checkoutform/Checkoutform'
import UseUpdateShipping from '../../Hooks/ShippingAddress/UseUpdateShipping'

const UpdateShipping = () => {

const {id} = useParams()

const {status, currentAddress, deliveryInfo, handleChange, error, handleSubmitDeliveryInformation} = UseUpdateShipping(id)

const submitUpdateShipping = async (e) => {
    e.preventDefault()
    await handleSubmitDeliveryInformation()
}


  return (

    <>

        <section className='w-1/2 pl-6 relative'>

            {currentAddress 
                ? 
                    <Checkoutform
                        status={status}
                        userDeliveryInfo={deliveryInfo}
                        handleUserDeliveryInfo={handleChange}
                        error={error}
                        handleFormSubmit={submitUpdateShipping}
                    >
                    </Checkoutform>
                    : 
                    <p className='text-lg text-my-primary font-Montserrat'> The shipping address does not exist </p>
            }

        </section>
    </>
  )
}

export default UpdateShipping