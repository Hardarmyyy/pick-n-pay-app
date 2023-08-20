import React from 'react'
import Button from '../../../../Utilities/Button'
import '../ProductCard/ProductCard.css'
import { BsBagHeart } from "react-icons/bs";
import { Link } from 'react-router-dom'



const ProductCard = ({id, type, src, alt, title, price, special, addProduct, like, likeAndFavourites, unlikeAndNotFavourites}) => {


return (

<>
    
    <div className='productCardContainer'>

        {like ? 
            <BsBagHeart className='likeIcon' onClick={unlikeAndNotFavourites}></BsBagHeart> 
        : 
            <BsBagHeart className='unlikeIcon' onClick={likeAndFavourites}></BsBagHeart> 
        }

        <Link to={`/category/${type}/${id}`} className='details'> 
            <img src={src} alt={alt} />
        </Link>

        <h3>{title}</h3> 
        <p> <span className='currency'> $ </span>{price}</p>

        <div className='addDetails'>

            <Button padding='5px 20px' eventHandler={addProduct}>Add to cart</Button>
            
        </div>

        {special ? <p className='special'> Popular choice</p> : null}
    
    </div>  

</>

)
}

export default ProductCard