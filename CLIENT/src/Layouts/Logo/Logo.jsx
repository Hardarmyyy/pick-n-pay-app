import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {


return (

    <>
        <nav className=' text-blue-950 cursor-pointer font-Jost font-bold md:text-3xl lg:text-4xl'> 

            <Link to='/'> <h1> Pick<span className='text-crimson'>N</span>Pay </h1> </Link> 

        </nav>
    </>
)
}

export default Logo