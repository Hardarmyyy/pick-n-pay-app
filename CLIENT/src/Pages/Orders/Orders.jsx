import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../../Layouts/Navigation/Navigation'
// import OrderDetails from '../../Components/Pages/Orders/OrderDetailsModal/OrderDetails'
import './Orders.css'


const Orders = () => {

const navigate = useNavigate()

// define a state to open and close orderComplete Modal
const [openModal, setOpenModal] = useState(false)

// define a function to close Modal;
const closeModal = () => { 
    setOpenModal(false);
}


return (

<>
    <Navigation ></Navigation>

    <section className='buyerOrderContainer'>

        <h1 className='orderTitle'> My orders </h1>

        {/* <div className='orderTable'>
    
                <table>
                    <thead>
                        <tr>
                            <th> Order Id </th>
                            <th> Status </th>
                            <th> Amount </th>
                            <th> Date </th>
                            <th>  </th>
                        </tr>
                    </thead>

                    <tbody>
                        {myOrders?.map((order) =>
                            <>
                                <tr key={order._id} className='myOrders'>
                                    <td className='orderId'> {order.orderID} </td>
                                    {order.completed ? <td className='status'> completed </td> : <td className='status'> pending </td>}
                                    <td className='orderTotal'> ${order.orderTotal} </td>
                                    <td className='date'> {order.date}</td>
                                    <td> 
                                        <button className='actionDetails' onClick={() => {
                                            setOpenModal(true)
                                            navigate(`/order-details/${order._id}`)
                                            }}> 
                                        view details 
                                        </button> 
                                    </td>
                                </tr>

                                {openModal && <OrderDetails closeModal={closeModal} orderedItems={order.orderedItems}></OrderDetails>}
                            </>
                        )}
                        
                    </tbody>
                    
                </table>

            {!isLoading && (myOrders?.length == 0 || !myOrders) &&

                <p className='emptyOrder'> Sorry you have no orders yet</p>
            }

        </div> */}

    </section>
    
</>

)
}

export default Orders