import React from 'react'
import { useState } from 'react'
import Navigation from '../../Layouts/Navigation/Navigation'
import Footer from '../../Layouts/Footer/Footer'
import PaymentOptions from './PaymentOptions/PaymentOptions'
import Address from './Address/Address'
import OrderSummary from './OrderSummary/OrderSummary'


const CheckoutLayout = () => {


const [payment, setPayment] = useState({
    paymentMethod: '',
    shippingAddressId: ''
})

const handleChange = (e) => {
    const {name, value} = e.target
    setPayment((payment) => { return {...payment, [name]: value}})
}

const handleSubmitOrder = (e) => {
    e.preventDefault()
    console.log(payment)
    setPayment({
        paymentMethod: '',
        shippingAddressId: ''
    })
}

return (
<>
    <Navigation></Navigation>

    <section className='min-w-full my-4 px-4 flex justify-between items-start'> 

        <form className='w-full flex justify-between items-start' onSubmit={handleSubmitOrder}>

            <aside className='w-1/2 sticky top-0'>
                <PaymentOptions handleChange={handleChange}></PaymentOptions>
            </aside>

            <div className='w-96'>
                
                <Address handleChange={handleChange}></Address>

                <OrderSummary></OrderSummary>

            </div>

        </form>

    </section>
    
    <Footer></Footer>
</>

)
}

export default CheckoutLayout
