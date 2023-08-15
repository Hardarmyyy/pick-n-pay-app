import React from 'react'
import Navigation from '../../Navigation/Navigation'
import Footer from '../../Footer/Footer'
import { useContext } from 'react'
import { myProductContext } from '../../../../Utilities/ProductContext'
import { myUserContext } from '../../../../Utilities/UserContext'
import { useParams } from 'react-router-dom'
import ProductCard from '../../ProductListings/ProductCard/ProductCard'
import '../ProductDetail/ProductDetails.css'


const ProductDetail = () => {

// import user from myUserContext;
const {user, cartCounter, handleAddProducts, addProductMessage, addProductError, handleAddToFavourites,handleRemoveFromFavourites, likeMessage, unlikeMessage} = useContext(myUserContext)
const { username } = user

// import allproducts from myProductContext;
const {allProducts, handleLike} = useContext(myProductContext)

// catch the type property using useParams hook;
const {type}  = useParams()

// filter the exact product that match with type property;
const updatedProduct = allProducts.filter((product) => product.category === type); 

return (
<>
    <Navigation username={username} cartCounter={cartCounter} ></Navigation> 

    {addProductMessage && <p className='addProductMessage'> {addProductMessage} </p>}

    {addProductError && <p className='addProductError'> {addProductError} </p>}

    {likeMessage && <p className='likeMessage'> {likeMessage} </p>}

    {unlikeMessage && <p className='unlikeMessage'> {unlikeMessage} </p>}

        {updatedProduct.length > 0 ?
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
                                addProduct={() => { handleAddProducts(item)}}
                                toggleLike={() => { handleLike (item)}}
                                AddToFavourites={() =>handleAddToFavourites(item)}
                                removeFromFavourites={() =>handleRemoveFromFavourites(item)}>
                    </ProductCard>
                )} 
            </div>
        :
            <div className='emptyProductSeacrh'>
                <p> No available products for this category </p>
            </div>
        }
    
    <Footer></Footer>
</>
)
}

export default ProductDetail
