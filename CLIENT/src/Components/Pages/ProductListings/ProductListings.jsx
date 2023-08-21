import React from 'react'
import '../ProductListings/ProductListings.css'
import { useContext } from 'react'
import ProductCard from './ProductCard/ProductCard'
import { myUserContext } from '../../../Utilities/UserContext'
import Navigation from '../Navigation/Navigation'
import { useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'


const ProductListings = () => {


// import from myUserContext;
const {user, isLoading, allProducts, cartCounter, handleAddProducts, addProductMessage, addProductError, handleAddToFavourites, handleRemoveFromFavourites, likeMessage, likeMessageError, unlikeMessage } = useContext(myUserContext)

const { username } = user

// catch the brand property using useParams hook;
const {brand}  = useParams()

// filter the exact product that match with type property;
const updatedProduct = allProducts.filter((product) => product.brand === brand); 

// define a function to handle toggle Like and AddtoFavorites 
const likeAndFavourites = (prod) => {
    handleAddToFavourites(prod)
}

// define a function to handle toggle unLike and removeFromFavourites
const unlikeAndNotFavourites = (id) => {
    handleRemoveFromFavourites(id)
}


return (

<>
    <Navigation username={username} cartCounter={cartCounter} ></Navigation> 

    {addProductMessage && <p className='addProductMessage'> {addProductMessage} </p>}

    {addProductError && <p className='unlikeMessage'> {addProductError} </p>}

    {likeMessage && <p className='likeMessage'> {likeMessage} </p>}

    {likeMessageError && <p className='unlikeMessage'> {likeMessageError} </p>}

    {unlikeMessage && <p className='unlikeMessage'> {unlikeMessage} </p>}

    <section className='productContainer'>

        <h3 className='mainTitle'> Discover our weekly discounts </h3> 

        <p className='subTitle'> Find a great deal to suit your selection </p>

        {isLoading && <p className='loadingdetails cat'> Loading .... </p>}  

        {!isLoading && updatedProduct.length > 0 &&
            <div className='gridWrapper'> 

                {updatedProduct.map((item) => 
                    <ProductCard key={item._id} 
                        src={`../../../../productphoto/${item.photo[0].filename}`}
                        id={item._id}
                        type={item.brand}
                        alt={item.title} 
                        title={item.title} 
                        price={item.price} 
                        special={item.special}
                        like={item.like}
                        addProduct={() => {handleAddProducts (item, item._id)}}
                        likeAndFavourites={() => {likeAndFavourites (item)}}
                        unlikeAndNotFavourites={() => {unlikeAndNotFavourites (item._id)}}>
                    </ProductCard>
                )}

            </div>
        }

        {!isLoading && updatedProduct.length == 0 &&
            <div className='emptyProducts'>
                <h2> No products found </h2> 
            </div>
        }

    </section>

    <Footer></Footer>
</>

)

}

export default ProductListings