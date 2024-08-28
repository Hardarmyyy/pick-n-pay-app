import React from 'react'
import {Link} from 'react-router-dom'


const PageNotFound = () => {

return (

<>

    <section className='w-full min-h-[70vh] flex flex-col justify-center items-center font-Montserrat mx-auto'> 
        
        <h2 className='font-Jost font-bold mb-2 sm:text-4xl md:text-4xl tablet:text-5xl mini:text-5xl laptop:text-5xl super:text-6xl'> Page not found</h2>

        <p className='sm:text-sm md:text-sm tablet:text-lg mini:text-lg laptop:text-lg super:text-xl'>  Click <Link to='/' className='text-blue-600'> here </Link> to go back home</p>

    </section> 
    
</>
)
}

export default PageNotFound