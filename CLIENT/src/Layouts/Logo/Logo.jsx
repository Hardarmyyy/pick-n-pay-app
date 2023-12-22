import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'

const Logo = () => {


return (

    <>
        <nav> 

            <div className='logo'>

                <Link to='/'> <h1> Pick<span className='colored'>N</span>Pay </h1> </Link> 

            </div>

        </nav>
    </>
)
}

export default Logo