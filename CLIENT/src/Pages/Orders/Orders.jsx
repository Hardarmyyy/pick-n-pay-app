import React from 'react'
import { Link } from 'react-router-dom';
import useGetOrderHistory from '../../Hooks/Order/useGetOrderHistory'


const Orders = () => {

const {orderHistory, orderStatus, seller, buyer} = useGetOrderHistory();

return (

<>

    <section className='w-full h-1/2 tablet:h-1/2 mini:h-3/5 laptop:h-3/4 super:h-3/4 flex flex-col items-start py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60'>

        <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-2 text-blue-950 font-bold'> Order history </p>

        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">

            <table className="w-full text-sm text-left rtl:text-right">

                <thead className="text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            S/N
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Order ID
                        </th>
                        {buyer && 
                            <th scope="col" className="px-6 py-3">
                                status
                            </th>
                        }
                        <th scope="col" className="px-6 py-3">
                            payment method
                        </th>
                        <th scope="col" className="px-6 py-3">
                            shipping status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            order date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            delivered
                        </th>
                        <th scope="col" className="px-6 py-3">
                            order total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {orderStatus === 'Loading...' && 
                        <tr className="bg-white border-b">
                            <td className='py-10 text-center font-Montserrat' colSpan={10}> Fetching order history...  </td>
                        </tr>
                    }

                    {orderStatus === 'failed' && 
                        <tr>
                            <td className='py-10 text-center font-bold font-Montserrat' colSpan={10}> Failed to load order histroy  </td>
                        </tr>
                    }

                    {orderStatus !== 'Loading...' && orderHistory?.length === 0 

                        ?
                            <tr>
                                <td className='py-10 text-center font-bold font-Montserrat' colSpan={10}> You currently have no orders </td>
                            </tr>
                        :
                            orderHistory?.map((item, index) => (
                                <tr key={item.orderId} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-2">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                        {item.orderId}
                                    </th>
                                    {buyer &&
                                        <td className="px-6 py-2">
                                            {item.status ? <span className='text-green-400'> PAID </span> : <span className='text-red-600'> NOT PAID </span>}
                                        </td>
                                    }
                                    <td className="px-6 py-2">
                                        {item.paymentMethod}
                                    </td>
                                    <td className="px-6 py-2">
                                        {item.shippingStatus ? <span className='text-green-600'> SHIPPED </span> : <span className='text-red-600'> PENDING </span>}
                                    </td>
                                    <th scope='row' className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                        {item.createdAt}
                                    </th>
                                    <th scope='row' className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                        {item.deliveryStatus ? <span className='text-green-600'> YES </span> : <span className='text-red-600'> NO </span> }
                                    </th>
                                    <td className="px-6 py-2">
                                        ${item.orderTotal}
                                    </td>
                                    <td className="flex items-center px-6 py-2">
                                        <Link to={`#`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> View details </Link>
                                        {seller && !item.shippingStatus ? <button className="font-medium text-red-600 hover:underline ms-3"> Update Shipping </button> : null }
                                    </td>
                                </tr>
                            ))

                    }

                </tbody>

            </table>

        </div>

        <nav className="flex flex-col flex-wrap pt-4" aria-label="Table navigation">

            <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto"> 
                Showing 
                <span className="font-semibold text-gray-900"> 1-10 </span> 
                of 
                <span className="font-semibold text-gray-900"> 10 </span> 
            </span>

            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <Link className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</Link>
                </li>
                <li>
                    <Link className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</Link>
                </li>
                <li>
                    <Link className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</Link>
                </li>
                <li>
                    <Link className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
                </li>
            </ul>

        </nav>


    </section>
    
</>

)
}

export default Orders