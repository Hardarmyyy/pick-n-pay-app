import React from 'react'
import { Link } from 'react-router-dom'

const ProductAdded = () => {


  return (
    <>
        <section className='w-3/4 px-8 py-6 text-center font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto translate-y-0'>

            <p className='bg-green-300 mb-4 md:py-2 py-4 rounded-sm'> Product added to shop successfully </p>
            <p> Click <Link to={'/shop/all-products'} className='text-blue-600'> here </Link> to go back to shop </p>

        </section>
        
    </>
  )
}

export default ProductAdded