import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FETCHCARTITEMS } from '../../Services/cartApi'
import Spinner from '../../component/Spinner'
// import { AiFillDelete } from "react-icons/ai";
// import ProductCheckout from '../../Components/Pages/Checkout/ProductCheckout/ProductCheckout'


const CartProduct = () => {

const dispatch = useDispatch();
const cart = useSelector((state) => state?.cart?.cartItems);
const cartStatus = useSelector((state) => state?.cart?.status);

const username = useSelector((state) => state?.auth?.user?.userName);

useEffect(() => {
    dispatch(FETCHCARTITEMS(username))
}, [dispatch]);

return ( 

<> 

    <section className='w-full h-1/2 tablet:h-1/2 mini:h-3/5 laptop:h-3/4 super:h-3/4 flex justify-center items-center py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60'>

        {cartStatus === 'Loading.......' && <Spinner></Spinner>}

        {cartStatus === 'failed' &&
            <div className="font-Jost text-lg tablet:text-xl mini:text-3xl laptop:text-4xl super:text-4xl text-blue-950 text-center">
                <p> Failed to load cart items.</p>
                <p> Please try again. </p>
            </div>
        }

        {cartStatus !== 'Loading.......' && cart?.myCart?.length === 0  && 
                <p className='font-Jost text-lg tablet:text-xl mini:text-3xl laptop:text-4xl super:text-4xl text-blue-950'> Your cart list is empty </p> }

        {cartStatus !== 'Loading.......' && cart?.myCart?.length > 0 &&
            <div className='w-full py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60'>

                <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl text-blue-950'> Shopping Cart </p>
            
                <div className='w-full h-80 p-5 px-2 flex flex-col justify-center border mt-2 font-Montserrat text-sm text-my-primary rounded-md shadow-sm bg-white relative overflow-y-auto cart'>
                        
                        <>
                            {/* <div className='orderDetails'> 
                            
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
                            
                            </div> */}
                        
                            {/* <div className='pricing'>

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
                            
                            </div> */}
                        </>

                </div>

            </div>
        }

    </section>

</>

)
}

export default CartProduct
