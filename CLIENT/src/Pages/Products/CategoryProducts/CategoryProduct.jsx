import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CATEGORYPRODUCTS } from '../../../Services/categoryApi'
import Navigation from '../../../Layouts/Navigation/Navigation'
import Categories from '../../../component/Categories/Categories'

const CategoryProduct = () => {

const {category} = useParams()
const dispatch = useDispatch()
const categoryProducts = useSelector((state) => state.category?.categoryProducts)
const status = useSelector((state) => state.category?.status)

useEffect(() => {
    dispatch(CATEGORYPRODUCTS(category))
}, [])

  return (

    <>
        <Navigation category={category}></Navigation>

        <section className='min-w-full my-4 px-4 flex justify-between items-start'>

            <Categories></Categories>

            <main className='w-3/4 mx-auto'>

                <p className='font-Jost font-bold text-blue-950 md:text-2xl lg:text-4xl mb-4'> Discover our weekly discounts </p> 

                <p className='font-Jost text-blue-950 md:text-lg lg:text-2xl'> Find a great deal to suit your selection </p>

                {status === 'success' && !categoryProducts?.length 
                
                    ? <p className='text-center md:text-lg lg:text-2xl mt-20 text-my-primary font-Montserrat'> There are no products in this category </p>
                    
                        : 
                            <>
                                {categoryProducts.map((item) => (
                                    <p key={item?.productId}> {item?.title} </p>
                                ))}
                            </>
                }

            </main>

        </section>
    </>
  )
}

export default CategoryProduct