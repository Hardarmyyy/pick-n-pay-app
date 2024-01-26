import React from 'react'
import Checkoutform from '../CartProducts/Checkoutform/Checkoutform'
import UseAddShipping from '../../Hooks/ShippingAddress/UseAddShipping'

const AddShipping = () => {

const {deliveryInfo, handleChange, error, handleSubmitDeliveryInformation} = UseAddShipping()

const handleSubmitAddress = async (e) => {
    e.preventDefault()
    await handleSubmitDeliveryInformation()
}

  return (
    <> 

        <section className='w-1/2 pl-6'>

            <Checkoutform
                userDeliveryInfo={deliveryInfo}
                handleUserDeliveryInfo={handleChange}
                error={error}
                handleFormSubmit={handleSubmitAddress}
            ></Checkoutform>

        </section>
        
    </>
  )
}

export default AddShipping