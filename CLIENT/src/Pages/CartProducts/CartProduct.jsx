import React from 'react'
import { useState } from 'react'
import Navigation from '../../Layouts/Navigation/Navigation'
import Checkoutform from './Checkoutform/Checkoutform'
import { AiFillDelete } from "react-icons/ai";
// import ProductCheckout from '../../Components/Pages/Checkout/ProductCheckout/ProductCheckout'
import './CartProduct.css'


const CartProduct = () => { 


//define a state to handle the userDeliveryInfo form;
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
    const {name, value} = e.target
    setUserDeliveryInfo((userDeliveryInfo) => {return {...userDeliveryInfo, 
    [name]: name === 'address' ? value : value.replace(/\s/g, "")}})
}

// define a state to handle the existing shipping information;
const [existingShippingInfo, setExistingShipping] = useState(false)

const handleExistingShippingInfo = (e) => {
    setExistingShipping((existingShippingInfo) => !existingShippingInfo)
}


// define a function to handle the form submit of userDeliveryInfo and setModel to open;
const handleFormSubmit = (e) => {
    e.preventDefault();
    
}


return ( 

<> 

    <Navigation></Navigation>

    <section className='flex justify-between items-start px-6'>

        <div>
            <p className='font-Jost text-4xl text-blue-950'> Checkout</p>

            {/* <Checkoutform
                userDeliveryInfo={userDeliveryInfo}
                handleUserDeliveryInfo={handleUserDeliveryInfo}
                existingShippingInfo={existingShippingInfo}
                handleExistingShippingInfo={handleExistingShippingInfo}
                handleFormSubmit={handleFormSubmit}
            ></Checkoutform> */}
        </div>

        <div className='orderDetailsContainer'>

            <p className='font-Jost text-4xl text-blue-950'> Order summary </p>

            {/* <>
                {!isLoading && cartProducts.length > 0 &&
                    <>
                        <div className='orderDetails'> 
                        
                            {cartProducts.map((product) =>
                                <ProductCheckout key={product.productId} 
                                    title={product.title} 
                                    photo={`../../../../../productphoto/${product.photo[0]}`} 
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
            </> */}

        </div>

    </section>

</>

)
}

export default CartProduct
