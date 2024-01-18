import React from 'react'
import {Link} from 'react-router-dom'
import Navigation from '../../Layouts/Navigation/Navigation'


const PageNotFound = () => {

return (

<>
    <Navigation></Navigation>

    <section className='w-full flex flex-col justify-center items-center text-lg font-Montserrat text-my-primary mx-auto md:translate-y-24 lg:translate-y-36  relative'> 
        
        <h2 className='font-Jost md:text-4xl lg:text-5xl font-bold mb-2'> Page not found</h2>

        <p> Click <Link to='/' className='text-blue-600'> here </Link> to go back home</p>

    </section>
    
</>
)
}

export default PageNotFound