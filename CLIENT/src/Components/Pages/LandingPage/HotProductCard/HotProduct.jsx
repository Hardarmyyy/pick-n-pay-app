import React from 'react'
import '../HotProductCard/HotProduct.css'
import { Link } from 'react-router-dom';

const HotProduct = ({id, type, src, alt, title, price, special}) => {

return (

<>
    <div className='hotProduct'>
        <Link to={`/category/${type}/${id}`}>
            <img src={src} alt={alt} />
            <h3>{title}</h3>
            <p> <span className='currency'> $ </span>{price}</p>

            {special ? <p className='special'> Popular choice</p> : null}
        </Link>
    </div> 
</>

)
}

export default HotProduct