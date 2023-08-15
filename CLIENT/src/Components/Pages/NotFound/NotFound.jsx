import React from 'react'
import { Link } from 'react-router-dom'
import '../NotFound/NotFound.css'
import Navigation from '../Navigation/Navigation'
import { useContext } from 'react'
import { myProductContext } from '../../../Utilities/ProductContext'
import { myUserContext } from '../../../Utilities/UserContext'

const NotFound = () => {

// import user from myUserContext;
const {user, cartCounter} = useContext(myUserContext)
const {username} = user


return (

<> 
    <Navigation  username={username} cartCounter={cartCounter} ></Navigation>
    
    <section className='notFound'>

        <h1> Page not found </h1>
        <Link to = '/'> Back to home </Link> 

    </section>
</>

)

}

export default NotFound
