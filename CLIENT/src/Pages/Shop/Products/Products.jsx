import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { LuEdit } from "react-icons/lu";
import { AiFillDelete } from "react-icons/ai";
import UseDeleteProduct from '../../../Hooks/Shop/UseDeleteProduct';

const Products = () => {

const storeProducts = useSelector((state) => state.product?.store)
const status = useSelector((state) => state.product?.status)
const {handleDeleteproduct} = UseDeleteProduct()


  return (
    <>
      <section className='w-3/4 p-4 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto translate-y-0'>

    {status !== 'Loading.......' && 

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
                        {storeProducts.map((item) => (
                            <tr key={item.productId} className='border-b'>
                                <td className='py-2'> - </td>
                                <td className='py-2'> {item.productId.slice(0,12)} </td>
                                <td className='py-2'> <Link to={`/product/${item.productId}`} className='text-blue-600'>  {item.title.slice(0,40)} ..... </Link> </td>
                                <td className='py-2'> $ {item.price} </td>
                                <td className='py-2'> {item.category} </td>
                                <td className='py-2'> {item.countInStock > 0 ?  <span> {item.countInStock} </span> : <span> - </span>} </td>
                                <td className='py-2' > <AiFillDelete onClick={() => {handleDeleteproduct(item.productId)}} className='text-crimson cursor-pointer text-lg'></AiFillDelete></td>
                                <td className='py-2'> <Link to={`/shop/edit-product/${item?.productId}`}> <LuEdit className='text-gray-600 text-lg'></LuEdit> </Link> </td>
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

    }

      </section>
    </>
  )
}

export default Products