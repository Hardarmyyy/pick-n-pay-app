import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({eventHandler}) => {


return (

    <>
        <nav className='text-blue-950 cursor-pointer font-Jost font-bold text-xl tablet:text-2xl mini:text-3xl laptop:text-4xl super:text-4xl' onClick={eventHandler}> 

            <Link to='/'> <h1> Pick<span className='text-crimson'>N</span>Pay </h1> </Link> 

        </nav>
    </>
)
}

export default Logo