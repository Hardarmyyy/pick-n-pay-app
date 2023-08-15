import React from 'react'
import '../ProductCheckout/ProductCheckout.css'
import { AiFillDelete } from "react-icons/ai";



const ProductCheckout = ({title, photo, description, qty, price, deleteProduct, addQty, lessQty}) => {


return (

<>
    <div className='container'>

        <div className='title'>
            <p> {title} </p>
            <AiFillDelete onClick={deleteProduct} className='icon'></AiFillDelete>
        </div>

        <div className='details'>

            <img src={photo}/>
            <p className='description'> {description}....... </p>

            <div className='qty'>

                <p> Quantity </p>
                <div className='addSubtract'>
                    <button onClick={lessQty}> - </button> <span className='counter'> {qty} </span> <button onClick={addQty}> + </button>
                </div>

            </div>

        </div>

        <p className='totalPrice'> $ {(price * qty).toFixed(2)} </p>

    </div>
</>

)
}

export default ProductCheckout