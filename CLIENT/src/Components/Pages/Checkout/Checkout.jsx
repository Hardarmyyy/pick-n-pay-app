import React from 'react'
import '../Checkout/Checkout.css'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import Button from '../../../Utilities/Button'
import { myUserContext } from '../../../Utilities/UserContext'
import { useContext, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import ProductCheckout from './ProductCheckout/ProductCheckout'
import { useNavigate } from 'react-router-dom'



const Checkout = () => { 

const navigate = useNavigate()

// import user object from myUserContext and destructure cartProducts;
const {user, quantityMessage, quantityMessageError, addQty, lessQty, cartCounter, subTotal, cartMessage, handleEmptyCart, deletedItemMessage, removeProduct, isLoading} = useContext(myUserContext)
const {username, cartProducts} = user

// define a state to handle the userDeliveryInfo form;
const [userDeliveryInfo, setUserDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
})

const handleUserDeliveryInfo = (e) => {
    setUserDeliveryInfo((userDeliveryInfo) => {return {...userDeliveryInfo, [e.target.name]: e.target.value.replace(/\s/g, "")}})
}

// define a state to show all fields in the form are required
const [formError, setFormError] = useState(null)
const [emailErr, setEmailErr] = useState(false)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// define a function to handle the form submit of userDeliveryInfo and setModel to open;
const handleFormSubmit = (e) => {
    e.preventDefault();
    if(!userDeliveryInfo.firstName || !userDeliveryInfo.lastName || !userDeliveryInfo.email || !userDeliveryInfo.phoneNumber || !userDeliveryInfo.address || !userDeliveryInfo.city || !userDeliveryInfo.state || !userDeliveryInfo.zipcode) {
        return setFormError('Please enter all fields to proceed')
    }
    else if (!(emailRegex.test(userDeliveryInfo.email))) {
        setEmailErr(true)
        return setFormError('Please enter a valid email to proceed')
    }
    else {
         // console.log(userDeliveryInfo);
        setUserDeliveryInfo({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            zipcode: ''
        })
        navigate('/orderCompleted')
    }
}


// define a variable to store the shipping and vat amount
const shipping = subTotal > 500 ? 80 : 50
const vat = subTotal > 500 ? (7.5 / 100 ) * subTotal : (5 / 100 ) * subTotal

return ( 

<> 

    <Navigation username={username} cartCounter={cartCounter}></Navigation>
    {cartMessage && <p className='emptyCartMessage'> {cartMessage} </p>}
    {deletedItemMessage && <p className='emptyCartMessage'> {deletedItemMessage} </p>}
    {quantityMessage && <p className='addProductMessage'> {quantityMessage} </p>}
    {quantityMessageError && <p className='emptyCartMessage'> {quantityMessageError} </p>}
    
    <h1 className='checkout'> Checkout</h1>

    <section className='deliveryContainer'>

        {formError && <p className='checkoutFormError'> {formError} </p>}

        <form onSubmit={handleFormSubmit}> 

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
                    <input type='text' className={emailErr ? 'formErr': null} onFocus={() => {setEmailErr(false)}} value={userDeliveryInfo.email} onChange={handleUserDeliveryInfo} placeholder='Enter your email' name='email'/>
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

            <div className='button'> 
                <Button margin='20px 0px' padding='5px 200px'> Proceed to payment </Button>
            </div>

        </form>

        <div className='orderDetailsContainer'>

            <h2> Order summary </h2>

            {isLoading && <p className='isloading'> Loading .... </p>}

            <>
                {!isLoading && cartProducts.length > 0 &&
                    <>
                        <div className='orderDetails'> 
                        
                            {cartProducts.map((product) =>
                                <ProductCheckout key={product.productId} 
                                    title={product.title} 
                                    photo={`../../../../../public/productphoto/${product.photo[0]}`} 
                                    description={product.description.slice(0,40)} 
                                    qty={product.quantity} 
                                    price={product.price}
                                    deleteProduct={() => removeProduct(product.productId)} 
                                    addQty={() => addQty(product.productId)} 
                                    lessQty={() => lessQty(product.productId)}>
                                </ProductCheckout> 
                            )}

                            <div className='emptyCart'>
                                <Button backgroundColor ='crimson' eventHandler={handleEmptyCart}> Empty Cart <AiFillDelete></AiFillDelete> </Button>
                            </div>
                        
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
                    </>
                }
                {
                    !isLoading && cartProducts.length === 0 && <div className='emptyCartProduct'> <p> Your cart list is empty </p> </div> 

                }
            </>

        </div>

    </section>
    <Footer></Footer>

</>

)
}

export default Checkout
