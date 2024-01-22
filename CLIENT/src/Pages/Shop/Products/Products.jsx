import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { STOREPRODUCTS } from '../../../Services/productAPi';
import {Link} from 'react-router-dom'
import { LuEdit } from "react-icons/lu";
import { AiFillDelete } from "react-icons/ai";

const Products = () => {

const dispatch = useDispatch()
const userId = useSelector((state) => state.auth?.user?.userID)
const storeProducts = useSelector((state) => state.product?.store)

useEffect(() => {
    dispatch(STOREPRODUCTS(userId))
}, [dispatch]);


  return (
    <>
      <section className='w-3/4 px-8 py-4 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto translate-y-0'>

        <table className='w-full'>

            <thead className='text-sm border-b'>
                <tr>
                    <th className='pb-1'> S/N </th>
                    <th className='pb-1'> Product ID </th>
                    <th className='pb-1'> Title </th>
                    <th className='pb-1'> Price </th>
                    <th className='pb-1'> Category </th>
                    <th className='pb-1'> Qty </th>
                    <th className='pb-1'>  </th>
                    <th className='pb-1'>  </th>
                </tr>
            </thead>

            {storeProducts?.length > 0 
                ?
                    <tbody className='text-sm text-center'>
                        {storeProducts.map((item, index) => (
                            <tr key={item.productId} className=''>
                                <td className='py-2'> {index} </td>
                                <td className='py-2'> {item.productId.slice(0,12)} </td>
                                <td className='py-2'> <Link to={`/product/${item.productId}`} className='text-blue-600'>  {item.title} </Link> </td>
                                <td className='py-2'> $ {item.price} </td>
                                <td className='py-2'> {item.category} </td>
                                <td className='py-2'> {item.countInStock > 0 ?  <span> {item.countInStock} </span> : <span> - </span>} </td>
                                <td className='py-2' > <AiFillDelete className='text-crimson cursor-pointer text-lg'></AiFillDelete></td>
                                <td className='py-2'> <Link to={`/edit-product/${item.productId}`}> <LuEdit className='text-gray-600 text-lg'></LuEdit> </Link> </td>
                            </tr>
                        ))}
                    </tbody>

                    :
                        <tbody className='text-lg text-center'>
                            <tr>
                                <td className='py-10' colSpan={5}> You currently have no product on the shelf  </td>
                            </tr>
                        </tbody>
            } 
            
        </table>

      </section>
    </>
  )
}

export default Products