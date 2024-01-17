import React from 'react'



const Checkoutform = ({}) => {


  return (

    <>
        <form onSubmit={{}}> 

            <h2> Contact information</h2>
            <p> Complete the form. All field with <span className='required'> *  </span> is required. </p>

            <div className='name'>

                <div className='fname'>
                    <label> First Name <span className='required'> * </span></label> <br />
                    <input type='text'  value={userDeliveryInfo.firstName} onChange={handleUserDeliveryInfo} placeholder='Enter your first name' name='firstName' maxLength={30}/>
                </div>
                <div className='lname'>
                    <label> Last Name <span className='required'> * </span></label> <br />
                    <input type='text' value={userDeliveryInfo.lastName} onChange={handleUserDeliveryInfo} placeholder='Enter your last name' name='lastName' maxLength={30}/>
                </div>

            </div>

            <div className='emailPhone'>

                <div className='mail'>
                    <label> Email Address <span className='required'> * </span></label> <br />
                    <input type='text' className='' onFocus={() => {setEmailErr(false)}} value={userDeliveryInfo.email} onChange={handleUserDeliveryInfo} placeholder='Enter your email' name='email'/>
                </div>
                <div className='number'>
                    <label> Phone Number <span className='required'> * </span></label> <br />
                    <input type='number' value={userDeliveryInfo.phoneNumber} onChange={handleUserDeliveryInfo} placeholder='+234 800 000 0000' name='phoneNumber'/>
                </div>

            </div>

            <h2> Delivery information </h2>

            <div className='deliveryInfo'>

                <div className='addres'>
                    <label> Address </label> <br />
                    <input type='text' value={userDeliveryInfo.address} onChange={handleUserDeliveryInfo} placeholder='Enter your address' name='address'/>
                </div>

                <div className='addressInfo'>

                    <div className='city'>
                        <label> City </label> <br />
                        <input type='text' value={userDeliveryInfo.city} onChange={handleUserDeliveryInfo} placeholder='Enter your city' name='city'/>
                    </div>
                    <div className='state'>
                        <label> State </label> <br />
                        <input type='text' value={userDeliveryInfo.state} onChange={handleUserDeliveryInfo} placeholder='Enter your state' name='state'/>
                    </div>
                    <div className='zip'>
                        <label> Zip code </label> <br />
                        <input type='number' value={userDeliveryInfo.zipcode} onChange={handleUserDeliveryInfo} placeholder='00000' name='zipcode'/>
                    </div>

                </div>

            </div>

            <div className='exisitingShipping'>
                <input type='checkbox' value={existingShippingInfo} onChange={handleExistingShippingInfo}/> 
                <label> I have an existing shipping address and information </label>
            </div>

            <div className='button'> 
                <Button margin='20px 0px' padding='5px 200px'> Proceed to payment </Button>
            </div>

        </form>
    </>
  )
}

export default Checkoutform