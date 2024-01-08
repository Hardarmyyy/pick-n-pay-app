import React from 'react'
import {Link} from 'react-router-dom'
import Navigation from '../../Layouts/Navigation/Navigation'
import './Unauthorized.css'

const Unauthorized = () => {



  return (
    <>
        <Navigation></Navigation>

        <section className='unauthorized'>

          <p> You're not authorized to view this page </p>

          <p> Go back <Link to = '/'> home </Link> </p>

        </section>

    </>
  )
}

export default Unauthorized