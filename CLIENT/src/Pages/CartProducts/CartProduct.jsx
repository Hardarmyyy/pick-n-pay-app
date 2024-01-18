import React from 'react'
import { useSelector } from 'react-redux'
import UseDeliveryInformation from '../../Hooks/DeliveryInformation/UseDeliveryInformation'
import Navigation from '../../Layouts/Navigation/Navigation'
import Footer from '../../Layouts/Footer/Footer'
import Checkoutform from './Checkoutform/Checkoutform'
import { AiFillDelete } from "react-icons/ai";
// import ProductCheckout from '../../Components/Pages/Checkout/ProductCheckout/ProductCheckout'


const CartProduct = () => { 

const cart = useSelector((state) => state.cart.cartItems)

const {deliveryInfo, handleChange, error, handleSubmitDeliveryInformation} = UseDeliveryInformation()

// define a function to handle the form submit of userDeliveryInfo and setModel to open;
const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmitDeliveryInformation()
}


return ( 

<> 

    <Navigation></Navigation>

    <section className='min-w-full flex justify-between items-start px-6'>

        <div className='md:w-1/2 lg:w-1/2 xl:w-1/2'>
            <p className='font-Jost md:text-2xl lg:text-3xl xl:text-4xl text-blue-950'> Checkout </p>

            <Checkoutform
                userDeliveryInfo={deliveryInfo}
                handleUserDeliveryInfo={handleChange}
                error={error}
                handleFormSubmit={handleFormSubmit}
            ></Checkoutform>
        </div>

        <div className='md:w-72 lg:w-96'>

            <p className='font-Jost md:text-2xl lg:text-3xl xl:text-4xl text-left text-blue-950'> Order summary </p>
            
            <div className='w-full h-80 p-5 px-2 flex flex-col justify-center border mt-2 font-Montserrat text-sm text-my-primary rounded-md shadow-sm bg-white relative overflow-y-auto cart'>

                {cart.length > 0 
                    ? 
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

                        : <p className='font-Jost md:text-xl lg:text-2xl xl:text-3xl text-center text-blue-950'> Your cart list is empty </p>
                }

            </div>

        </div>

    </section>

    <Footer></Footer>

</>

)
}

export default CartProduct
