import React from 'react'
import Navigation from '../../Navigation/Navigation'
import Footer from '../../Footer/Footer'
import { useContext } from 'react'
import { myUserContext } from '../../../../Utilities/UserContext'
import { useParams } from 'react-router-dom'
import ProductCard from '../../ProductListings/ProductCard/ProductCard'
import '../ProductDetail/ProductDetails.css'


const ProductDetail = () => {

// import user from myUserContext;
const {user, isLoading, allProducts, cartCounter, handleAddProducts, addProductMessage, addProductError, handleAddToFavourites, handleRemoveFromFavourites, likeMessage, likeMessageError, unlikeMessage} = useContext(myUserContext)
const { username } = user

// catch the type property using useParams hook;
const {type}  = useParams()

// filter the exact product that match with type property;
const updatedProduct = allProducts.filter((product) => product.category === type); 


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

    <h3 className='mainTitle'> Discover our weekly discounts </h3> 

    <p className='subTitle'> Find a great deal to suit your selection </p>

    {isLoading && <p className='loadingdetails cat'> Loading .... </p>}  

    {!isLoading && updatedProduct.length > 0 &&
        <div className='wrapper'>
            {updatedProduct.map((item) =>
                <ProductCard key={item._id}
                            id={item._id}
                            type={item.category}
                            src={`../../../../../public/productphoto/${item.photo[0].filename}`}  
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
    
    {!isLoading && updatedProduct.length === 0 &&
        <div className='emptyProductSeacrh'>
            <p> No available products for this category </p>
        </div>
    }
    
    <Footer></Footer>
</>
)
}

export default ProductDetail
