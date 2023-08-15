import React from 'react'
import Button from '../../../../Utilities/Button'
import '../ProductCard/ProductCard.css'
import { BsBagHeart } from "react-icons/bs";
import { CgMoreVertical } from "react-icons/cg";
import { Link } from 'react-router-dom'



const ProductCard = ({id, type, src, alt, title, price, special, addProduct, like, toggleLike, AddToFavourites, removeFromFavourites}) => {

// define a function to handle toggle Like and AddtoFavorites 
const likeAndFavourites = () => {
    toggleLike()
    AddToFavourites()
}

// define a function to handle toggle unLike and removeFromFavourites
const unlikeAndNotFavourites = () => {
    toggleLike()
    removeFromFavourites()
}

return (

<>
    <div className='productCardContainer'>
        {like ? 
            <BsBagHeart className='likeIcon' onClick={unlikeAndNotFavourites}></BsBagHeart> 
        : 
            <BsBagHeart className='unlikeIcon' onClick={likeAndFavourites}></BsBagHeart> 
        }

        <img src={src} alt={alt} />
        <h3>{title}</h3> 
        <p> <span className='currency'> $ </span>{price}</p>

        <div className='addDetails'>
            <Button padding='5px 20px' eventHandler={addProduct}>Add to cart</Button>
            <Link to={`/category/${type}/${id}`} className='details'>  <CgMoreVertical className='moreDetailsIcon'></CgMoreVertical> </Link>
        </div>

        {special ? <p className='special'> Popular choice</p> : null}
    </div>  
</>

)
}

export default ProductCard