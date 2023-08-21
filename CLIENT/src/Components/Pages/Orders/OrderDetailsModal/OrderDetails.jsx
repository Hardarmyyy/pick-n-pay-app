import React from 'react'
import '../OrderDetailsModal/OrderDetails.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { myUserContext } from '../../../../Utilities/UserContext'
import Navigation from '../../Navigation/Navigation'


const OrderDetails = () => {

const navigate = useNavigate()

const {id} = useParams()

const {myOrders} = useContext(myUserContext)

const currentOrder = myOrders.filter((order) => order._id === id)

console.log(currentOrder)

const orderedProducts = currentOrder[0].orderedItems

console.log(orderedProducts)


return (

<>
    <Navigation></Navigation>

    <div className="orderModalBackground">

        <div className='orderModalContainer'>

            <div className="orderModalContent">

                <div className='cardContainer'> 

                    <div className='orderProductsInfo'>

                        {orderedProducts?.map((product) => 

                            <div key={product.productId} className='orderProductsWrapper'>

                                <div className='cardTitle'>
                                    <p> {product.title} </p>

                                    <div className='orderProductsqty'>

                                    {product.quantity > 1 ? 
                                        <p> {product.quantity} units </p> 
                                    :   <p> {product.quantity} unit  </p>
                                    }
                                    <p> @ $ <strong> {(product.price * product.quantity).toFixed(2)} </strong> </p>

                                </div>

                                </div>

                                <div className='details'>

                                    <img src={`../../../../../productphoto/${product.photo}`}/>

                                    <p className='description'> {product.description.slice(0, 50)} </p> 

                                </div>

                            </div>

                        )}

                    </div>
                    
                </div>

            </div>

            <button className='clearModal' onClick={() => {navigate('/all-orders')}}> close </button>

        </div>

    </div>

</>

)
}

export default OrderDetails