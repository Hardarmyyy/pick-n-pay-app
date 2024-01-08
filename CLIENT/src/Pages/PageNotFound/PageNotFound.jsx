import React from 'react'
import {Link} from 'react-router-dom'
import Navigation from '../../Layouts/Navigation/Navigation'
import './PageNotFound.css'


const PageNotFound = () => {

return (

<>
    <Navigation></Navigation>

    <section className='notFound'>
        
        <h2> Page not found</h2>

        <p> Click <Link to='/'> here </Link> to go back home</p>

    </section>
    
</>
)
}

export default PageNotFound