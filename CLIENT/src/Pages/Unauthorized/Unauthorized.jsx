import React from 'react'
import {Link} from 'react-router-dom'


const Unauthorized = () => {



  return (
    <>

      <section className='w-full min-h-[70vh] flex flex-col justify-center items-center font-Montserrat mx-auto'> 
      
        <p className='font-Jost md:text-2xl lg:text-4xl mb-2'> You're not authorized to view this page </p>

        <p className='sm:text-sm md:text-sm tablet:text-lg mini:text-lg laptop:text-lg super:text-xl'>  Click <Link to='/' className='text-blue-600'> here </Link> to go back home</p>

      </section> 

    </>
  )
}

export default Unauthorized