import React from 'react'
import { useState , useEffect, useContext} from 'react'
import Modal from './Modal'
import Footer from '../../Footer/Footer'
import Navigation from '../../Navigation/Navigation'
import { myUserContext } from '../../../../Utilities/UserContext'
import '../OrderCompleteModal/OrderComplete.css'
import {cards} from '../../../../Utilities/CarouselData/'
import Button from '../../../../Utilities/Button'
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import axios from 'axios'

const OrderCompleteLayout = () => {

// define a state to handle userType;
const [paymentOption, setPaymentOption] = useState('');
const [paymentOptionErr, setPaymentOptionErr] = useState(false)

const handlePaymentOption = (event) => {
    setPaymentOption(event.target.value);
    setPaymentOptionErr(false)
};

// import user object from myUserContext and destructure cartProducts;
const {user, cartCounter, subTotal} = useContext(myUserContext)
const {username, cartProducts} = user

// define a state to manage the current user shipping information;
const [isLoading, setIsLoading] = useState(true)
const [shippingAddress, setShippingAddress] = useState(null)

useEffect(() => {
    axios
    .get('http://localhost:4050/api/shipping/all/'+username)
    .then((response) => {
        const result = response?.data?.shippingAddress?.myShippingAddress;
        setShippingAddress(result)
    })
    .catch((error) => {
        
    })
    setTimeout(() => {
        setIsLoading(false)
    }, 500)
}, [username]); 

// filter the last shipping address for the current user
const currentShippingAddress = shippingAddress?.slice(-1)

// define a state to open and close orderComplete Modal
const [openModal, setOpenModal] = useState(false)

// define a function to close Modal;
const closeModal = () => { 
    setOpenModal(false);
}

// define a variable to store the shipping and vat amount
const shipping = subTotal > 500 ? 80 : 50
const vat = subTotal > 500 ? (7.5 / 100 ) * subTotal : (5 / 100 ) * subTotal

//define a function to handle form submit after payment has been selected
const handleSubmit = (e) => {
    const shippingInfo = currentShippingAddress[0]
    e.preventDefault();
    if (!paymentOption) {
        setPaymentOptionErr(true)
    }
    else {
        axios
        .post('http://localhost:4050/api/order/complete/'+ username, shippingInfo)
        .then((response) => {
            setTimeout(() => {
                setOpenModal(true)
            },1200)
        })
        .catch((error) => {
            
        })
    }
}


return (
<>
    <Navigation  username={username} cartCounter={cartCounter}></Navigation>

    <section className='finalCheckout'>

        <div className='paymentContainer'>

            <h4 className='shippingTitle'> Choose a payment option </h4>
            
            {paymentOptionErr && <p className='paymnetOptionErr'> Please select a payment option to proceed </p>}

            <div className='paymentType'>

                <form onSubmit={handleSubmit}>

                    <div className='card'>
                        <label> <input type='radio' value='mastercard' checked={paymentOption === 'mastercard'} onChange={handlePaymentOption} name='mastercard'/> </label> 
                        <img src={cards[0].img} alt={cards[0].title}/>
                    </div>

                    <div className='card'>
                        <label> <input type='radio' value='paypal' checked={paymentOption === 'paypal'} onChange={handlePaymentOption} name='paypal'/> </label> 
                        <img src={cards[1].img} alt={cards[1].title}/>
                    </div>

                    <div className='card'>
                        <label> <input type='radio' value='visa' checked={paymentOption === 'visa'} onChange={handlePaymentOption} name='visa'/> </label> 
                        <img src={cards[2].img} alt={cards[2].title}/>
                    </div>

                    <Button margin='10px 0px' padding='5px 80px'> Complete payment and order</Button>

                </form>

                <IoShieldCheckmarkOutline className='protectionIcon'></IoShieldCheckmarkOutline> <span className='protection'> Get full refund if the item is not as described or if is not delivered </span>

            </div>

        </div>

        <div className='shippingAndOrder'>

            <h4 className='shippingTitle'> Shipping information </h4>

            {!isLoading && currentShippingAddress &&
                <div className='shippingInfoContainer'>

                    {currentShippingAddress.map((shipping, index ) => (

                        <div className='shippingInformation' key={index}>
                            <p>Full name: {shipping.firstName} {shipping.lastName} </p>
                            <p>E-mail: {shipping.email} </p>
                            <p> Address: {shipping.address} {shipping.city}, {shipping.state} </p>
                            <p> Phone Number: +{shipping.phoneNumber} </p>
                        </div>
                    ))}

                </div>
            }

            {!isLoading  && !currentShippingAddress &&

                <div className='shippingInfoContainer'>

                    <p className='emptyShippingInfo'> You don't have a shipping address </p>

                </div>
            }   

            <div className='summary'>

                <h4 className='shippingTitle'> Order summary </h4>

                <div className='orderDetails'>
                
                    {cartProducts.map((product ) => 

                        <div className='cardContainer'> 

                            <div className='cardTitle'>
                                <p> {product.title} </p>
                            </div>

                            <div className='details'>

                                <img src={`../../../../../productphoto/${product.photo[0]}`}/>

                                <p className='description'> {product.description.slice(0, 35)} </p> 

                            </div>

                            <div className='quantity'>

                                {product.quantity > 1 ? <p> {product.quantity} units ------------------------ </p> : <p> {product.quantity} unit ------------------------ </p>}
                                <p> @ $ <strong> {(product.price * product.quantity).toFixed(2)} </strong> </p>

                            </div>

                        </div>
                    )}

                </div>

                <div className='pricing'>

                    <div className='subtotal'>
                        <p> Subtotal </p>
                        <h6> $ {subTotal.toFixed(2)} </h6>
                    </div>
                    <div className='shipping'>
                        <p> Shipping </p>
                        <h6> $ {shipping} </h6>
                    </div>
                    <div className='tax'>
                        <p> VAT Tax </p>
                        <h6> $ {vat.toFixed(2)} </h6>
                    </div>
                    <div className='total'>
                        <p> Total </p>
                        <h6> $ {(subTotal + shipping + vat).toFixed(2)} </h6>
                    </div>

                </div>

            </div>
        </div>

    </section>

    {openModal && <Modal closeModal={closeModal}></Modal>}
    
    <Footer></Footer>
</>

)
}

export default OrderCompleteLayout
