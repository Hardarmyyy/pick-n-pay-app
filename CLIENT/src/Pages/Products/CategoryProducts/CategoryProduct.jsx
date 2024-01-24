import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navigation from '../../../Layouts/Navigation/Navigation'
import Categories from '../../../component/Categories/Categories'

const CategoryProduct = () => {

const {category} = useParams()
const categoryProducts = useSelector((state) => state.product?.categoryProducts)


  return (

    <>
        <Navigation category={category}></Navigation>

        <section className='min-w-full my-4 px-4 flex justify-between items-start'>

            <Categories></Categories>

            <main className='w-3/4 mx-auto'>

                <p className='font-Jost font-bold text-blue-950 md:text-2xl lg:text-4xl mb-4'> Discover our weekly discounts </p> 

                <p className='font-Jost text-blue-950 md:text-lg lg:text-2xl'> Find a great deal to suit your selection </p>

                {categoryProducts?.length 
                    ?
                        <>
                            
                        </>

                        : 

                            <p className='text-center md:text-lg lg:text-2xl mt-20 text-my-primary font-Montserrat'> There are no products in this category </p>
                }

            </main>

        </section>
    </>
  )
}

export default CategoryProduct