import React from 'react'
import { useParams } from 'react-router-dom'
import UseCategory from '../../../Hooks/Category/UseCategory'
import Categories from '../../../component/Categories/Categories'
import PriceFilter from '../../../component/PriceFilter'
import Spinner from '../../../component/Spinner'
import { BsFilter } from "react-icons/bs";
import ProductCard from '../../../component/ProductCard'

const CategoryProduct = () => {

    const {category} = useParams()
    
    const {categoryProducts, categoryStatus} = UseCategory(category)

    return (

        <>

            <section className='w-full min-h-screen py-6 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex sm:flex-col md:flex-col justify-center items-start relative'> 

                <div className='sm:hidden md:hidden tablet:w-1/5 mini:w-36 laptop:w-44 super:w-44 text-my-primary font-Montserrat flex-shrink-0'>

                    <div className="w-full h-auto py-2 bg-gray-200 rounded-md shadow-sm">

                        <Categories></Categories>

                        <div className='border border-gray-400 bg-gray-400 h-1'></div>

                        <PriceFilter></PriceFilter>

                    </div>

                </div>

                <div className='w-full tablet:ms-4 mini:ms-4 laptop:ms-6 super:ms-6 flex-1 flex flex-col'>

                    <div className='flex-shrink-0 font-Jost text-blue-950 mb-2'>
                        <p className='text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-2'> Discover our weekly discounts </p> 
                        <p className='text-sm tablet:text-lg mini:text-lg laptop:text-xl super:text-xl'> Find a great deal to suit your selection </p>
                    </div>

                    <div className='w-16 flex justify-between items-start tablet:hidden mini:hidden laptop:hidden super:hidden'>
                        <span className='font-Jost text-sm'> Filter </span> <BsFilter className='text-2xl text-blue-950' />
                    </div>

                    <div className='w-full min-h-[70vh] flex justify-center items-center flex-1'>

                        {categoryStatus === 'Loading.......' && <> <Spinner></Spinner> </>}

                        {!categoryProducts && categoryStatus === 'failed' &&
                            <div className="font-Jost text-lg tablet:text-xl mini:text-3xl laptop:text-4xl super:text-4xl text-blue-950 text-center">
                                <p> Failed to load items in this category.</p>
                                <p> Please try again. </p>
                            </div>
                        }

                        {categoryStatus !== 'Loading.......' && categoryProducts?.length === 0 && <p className='text-sm tablet:text-lg mini:text-xl laptop:text-2xl super:text-3x text-my-primary font-Montserrat'> There are no products in this category </p> }
                        
                        {categoryStatus !== 'Loading.......' && categoryProducts?.length > 0 &&
                                    <div className='w-full mt-5 flex flex-wrap'>
                                        {/* {categoryProducts.map((item) => (
                                            <ProductCard
                                                key={item?.productId}
                                                title={item?.title}
                                                price={item?.price}
                                            >
                                            </ProductCard>
                                        ))} */}
                                    </div>
                        }

                    </div>

                </div>

            </section>

        </>
    )
}

export default CategoryProduct