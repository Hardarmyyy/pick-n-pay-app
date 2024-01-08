import React from 'react'
import Navigation from '../../Layouts/Navigation/Navigation'
// import ProductCard from '../../Components/Pages/ProductListings/ProductCard/ProductCard'
import './Favourites.css'


const FavouritesLayout = () => {

return (

<>
    <Navigation  ></Navigation>

    <section className='favouritesContainer'>

        <h3 className='wishlist'> Wishlist </h3>

        {/* {isLoading && <p className='loadingMessage'> Loading .... </p>} 

            {!isLoading && favourites.length > 0 &&
                <div className='favouriteswrapper'>
                
                    {favourites.map((item) =>
                        <ProductCard key={item._id}
                                    id={item.productId}
                                    src={`../../../../../productphoto/${item.photo[0]}`}  
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
            } */}

    </section>
</>

)
}

export default FavouritesLayout