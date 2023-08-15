import React from 'react'
import Footer from '../../Footer/Footer'
import Navigation from '../../Navigation/Navigation'
import ProductListings from '../../ProductListings/ProductListings'
import { useContext } from 'react'
import { myUserContext } from '../../../../Utilities/UserContext'

const AllProducts = () => {

// import user from myUserContext;
const {user, cartCounter} = useContext(myUserContext)
const { username} = user


return (

<> 
    <Navigation  username={username} cartCounter={cartCounter} ></Navigation>
    <ProductListings></ProductListings> 
    <Footer></Footer>
</>

)
}

export default AllProducts
