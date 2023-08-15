import React from 'react'
import '../ProductListings/ProductListings.css'
import { useContext } from 'react'
import { myProductContext } from '../../../Utilities/ProductContext'
import ProductCard from './ProductCard/ProductCard'
import { myUserContext } from '../../../Utilities/UserContext'


const ProductListings = () => {

// import the initialState from myProductContext and destrcuture filteredProducts from the initialState;
const {allProducts, handleLike} = useContext(myProductContext)

// import from myUserContext;
const {handleAddProducts, addProductMessage, existingProduct, handleAddToFavourites,handleRemoveFromFavourites, likeMessage, unlikeMessage, } = useContext(myUserContext)


return (

<>
    <section className='productContainer'>

        {addProductMessage && <p className='addProductMessage'> {addProductMessage} </p>}

        {existingProduct && <p className='existingProductMessage'> {existingProduct} </p>}

        {likeMessage && <p className='likeMessage'> {likeMessage} </p>}

        {unlikeMessage && <p className='unlikeMessage'> {unlikeMessage} </p>}

        <h3 className='title'> Discover our weekly discounts </h3> 

        <p className='subTitle'> Find a great deal to suit your selection </p>

        {allProducts.length > 0 ?
            <div className='gridWrapper'> 

                {allProducts.map((item) => 
                    <ProductCard key={item._id} 
                        src={`../../../../public/productphoto/${item.photo[0].filename}`}
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
            <div className='emptyProducts'>
                <h2> No products found </h2>
            </div>
        }

    </section>
</>

)

}

export default ProductListings