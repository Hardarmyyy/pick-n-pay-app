import React from 'react'
import {Link} from 'react-router-dom'
import Navigation from '../../Layouts/Navigation/Navigation'


const Unauthorized = () => {



  return (
    <>
        <Navigation></Navigation>

        <section className='w-full flex flex-col justify-center items-center text-xl font-Montserrat text-my-primary mx-auto md:translate-y-28 lg:translate-y-36 relative'>

          <p className='font-Jost md:text-2xl lg:text-4xl mb-2'> You're not authorized to view this page </p>

          <p> Go back <Link to = '/' className='text-blue-600'> home </Link> </p>

        </section>

    </>
  )
}

export default Unauthorized