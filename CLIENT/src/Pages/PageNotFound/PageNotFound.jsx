import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../../Layouts/Logo/Logo'
import './PageNotFound.css'


const PageNotFound = () => {

return (

<>
    <Logo></Logo>

    <section className='notFound'>
        
        <h2> Page not found</h2>

        <p> Click <Link to='/'> here </Link> to go back home</p>

    </section>
    
</>
)
}

export default PageNotFound