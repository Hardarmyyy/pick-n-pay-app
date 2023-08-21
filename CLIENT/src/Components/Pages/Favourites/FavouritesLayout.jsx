import React from 'react'
import '../Favourites/Favourites.css'
import Navigation from '../Navigation/Navigation'
import ProductCard from '../ProductListings/ProductCard/ProductCard'
import { myUserContext } from '../../../Utilities/UserContext'
import { useContext } from 'react'

const FavouritesLayout = () => {

// import user from myUserContext;
const {user, isLoading, cartCounter, handleAddProducts, addProductMessage, addProductError, handleAddToFavourites, handleRemoveFromFavourites, likeMessage, unlikeMessage} = useContext(myUserContext)
const { username, favourites } = user

// define a function to handle toggle Like and AddtoFavorites 
const likeAndFavourites = (prod) => {
    handleAddToFavourites(prod)
}

// define a function to handle toggle unLike and removeFromFavourites
const unlikeAndNotFavourites = (prod) => {
    handleRemoveFromFavourites(prod.productId)
}

return (

<>
    <Navigation username={username} cartCounter={cartCounter} ></Navigation>

    {addProductMessage && <p className='addProductMessage'> {addProductMessage} </p>}

    {addProductError && <p className='unlikeMessage'> {addProductError} </p>}

    {likeMessage && <p className='likeMessage'> {likeMessage} </p>}

    {unlikeMessage && <p className='unlikeMessage'> {unlikeMessage} </p>}

    <section className='favouritesContainer'>

        <h3 className='wishlist'> Wishlist </h3>

        {isLoading && <p className='loadingMessage'> Loading .... </p>} 

            {!isLoading && favourites.length > 0 &&
                <div className='favouriteswrapper'>
                
                    {favourites.map((item) =>
                        <ProductCard key={item._id}
                                    id={item.productId}
                                    src={`../../../../../public/productphoto/${item.photo[0]}`}  
                                    alt={item.title} 
                                    title={item.title} 
                                    price={item.price} 
                                    special={item.special}
                                    like={item.like}
                                    addProduct={() => {handleAddProducts(item, item.productId)}}
                                    likeAndFavourites={() => {likeAndFavourites (item)}}
                                    unlikeAndNotFavourites={() => {unlikeAndNotFavourites (item)}}>
                        </ProductCard>
                    )} 
                
                </div>
            }
            
            {!isLoading && favourites.length === 0 &&     
                <div className='emptyFavourites'>
                    <p> Your wishlist is empty </p>
                </div>
            }

    </section>
</>

)
}

export default FavouritesLayout