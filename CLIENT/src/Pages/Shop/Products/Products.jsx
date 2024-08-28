import React from 'react'
import {Link} from 'react-router-dom'
import UseDeleteProduct from '../../../Hooks/Shop/UseDeleteProduct';
import UseFetchStore from '../../../Hooks/Shop/UseFetchStore';

const Products = () => {

const {shopStatus, storeProducts} = UseFetchStore(); 
const {handleDeleteproduct} = UseDeleteProduct();


  return (
    <>
        <section className='w-full tablet:w-3/4 mini:w-3/4 laptop:w-4/5 super:w-4/5 mx-auto flex flex-col justify-center items-start'>

            <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-2 text-blue-950 font-bold text-center'> Products </p>

            <div className="w-full pb-4 bg-white">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search" className="w-full md:w-3/5 tablet:w-2/4 mini:w-2/5 laptop:w-2/5 super:w-2/5 block pt-2 ps-10 text-sm text-gray-900 border border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950" placeholder="Search for products"/>
                </div>
            </div>

            <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right">

                    <thead className="text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S/N
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {shopStatus === 'Loading...' && 
                            <tr className="bg-white border-b">
                                <td className='py-10 text-center font-Montserrat' colSpan={6}> Fetching products...  </td>
                            </tr>
                        }

                        {shopStatus === 'failed' && 
                            <tr>
                                <td className='py-10 text-center font-bold font-Montserrat' colSpan={6}> Failed to load shop products  </td>
                            </tr>
                        }

                        {shopStatus !== 'Loading...' && storeProducts?.length === 0 

                            ?
                                <tr>
                                    <td className='py-10 text-center font-bold font-Montserrat' colSpan={6}> You currently have no product on the shelf  </td>
                                </tr>
                            :
                                storeProducts?.map((item, index) => (
                                    <tr key={item.productId} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-2">
                                            {index + 1}
                                        </td>
                                        <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <Link to={`/product/${item?.productId}`} className='text-blue-600'> 
                                                {item?.title.length > 40 ? <span> {item?.title.slice(0,40)} ..... </span> : <span> {item.title} </span>}
                                            </Link> 
                                        </th>
                                        <td className="px-6 py-2">
                                            {item.category}
                                        </td>
                                        <td className="px-6 py-2">
                                            ${item.price.toFixed(2)}
                                        </td>
                                        <th scope='row' className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            {item.countInStock > 0 ?  <span> {item.countInStock} </span> : <span> - </span>}
                                        </th>
                                        <td className="flex items-center px-6 py-2">
                                            <Link to={`/shop/edit-product/${item?.productId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3" onClick={() => {handleDeleteproduct(item?.productId)}}>Remove</button>
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

export default Products