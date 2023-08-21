import React from 'react'
import '../Details/Details.css'
import { useParams, Link } from 'react-router-dom'
import Navigation from '../../Navigation/Navigation';
import Footer from '../../Footer/Footer';
import { useContext, useState } from 'react';
import { myUserContext } from '../../../../Utilities/UserContext';
import Button from '../../../../Utilities/Button';
import { BsBagHeart } from "react-icons/bs";
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton,TelegramShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon} from "react-share";
import Ratings from './Ratings/Ratings';


const Details = () => {
// define a variable to store the current page location for the social share icons;
const currentPageUrl = window.location.href;

// import user from myUserContext and destructure it contents;
const {user, isLoading, allProducts, cartCounter, handleAddToFavourites, handleRemoveFromFavourites, handleAddProducts, 
    addProductMessage, addProductError, quantityMessage, quantityMessageError, likeMessage, likeMessageError, unlikeMessage, addQty, lessQty} = useContext(myUserContext) 

const {username, cartProducts} = user 

// catch the id property using useParams hook; 
const {id} = useParams();

// filter the exact product that match with type property; 
const detailedProduct = allProducts.filter((product) => product._id === id);

// filter the exact product from cart to know show the quantity added
const cartItem = cartProducts.filter((pro) => pro.productId === id)
const cartProduct = cartItem[0] 


// define a function to toggle addToFavourites and Like
const likeAddtoFavourites = (prod) => {
    handleAddToFavourites(prod)
}

// define a function to toggle removeFavourites and unLike
const unLikeRemoveFavourites = (id) => {
    handleRemoveFromFavourites(id)
}

// define state to handle show description or review
const [description, showDescription] = useState(true)
const [review, showReview] = useState(false)

const handleShowDescription = () => {
    showDescription(true)
    showReview(false)
}

const handleshowReview = () => {
    showReview(true)
    showDescription(false)
}

// define a state to handle show quantity buttons
const [quantity, setQuantity] = useState(null)

// define a state to handle show add to cart button
const [addCart, setAddToCart] = useState(true)

const setShowQuantity = () => {
    setAddToCart(null)
    setQuantity(true)
}

// define a function to show add quantity buttons when item has been added to cart
const addItemToCart = (item) => {
    handleAddProducts(item, item._id)
    setShowQuantity()
}

return (

<> 
    <Navigation username={username} cartCounter={cartCounter}></Navigation>
    
    {addProductMessage && <p className='addProductMessage'> {addProductMessage} </p>}

    {quantityMessage && <p className='addProductMessage'> {quantityMessage} </p>}

    {addProductError && <p className='unlikeMessage'> {addProductError} </p>}

    {quantityMessageError && <p className='unlikeMessage'> {quantityMessageError} </p>}

    {likeMessage && <p className='likeMessage'> {likeMessage} </p>}

    {likeMessageError && <p className='unlikeMessage'> {likeMessageError} </p>}

    {unlikeMessage && <p className='unlikeMessage'> {unlikeMessage} </p>}

    <section className='detailsContainer'>

        {isLoading && <p className='loadingdetails'> Loading .... </p>} 

        {!isLoading && detailedProduct.map((item) =>

            <div key={item._id} className='wrapperDetails'>  

                {item.like ? 
                    <BsBagHeart className='likesIcon' onClick={()=>{unLikeRemoveFavourites(item._id)}}></BsBagHeart> 
                : 
                    <BsBagHeart className='unlikesIcon' onClick={()=>{likeAddtoFavourites(item)}}></BsBagHeart> 
                }

                <div className='centerImage'>
                    <img src={`../../../../../productphoto/${item.photo[0].filename}`} alt={item.title}/>
                </div>

                <div className='info'>

                    <h3> {item.title} </h3>
                    <p className='pricey'> $ {item.price} / unit </p>
                    <p> {item.description.slice(0,150)} </p>

                    <div className='addProd'>

                        {user.usertype === 'seller' && 

                            <Button padding='5px 60px' eventHandler={()=> handleAddProducts(item, item._id)} > Add to cart </Button>
                        
                        }

                        {user.usertype === null && 

                            <Button padding='5px 60px' eventHandler={()=> handleAddProducts(item, item._id)} > Add to cart </Button>
                        
                        }
            
                        {user.usertype === 'buyer' &&
                            <>
                                {cartProduct && 

                                    <div className='qtyCount addSubtract'>
                                        {cartProduct?.quantity === 1 ? <button disabled> - </button> : <button onClick={() => {lessQty(item._id)}}> - </button> }
                                            <span className='counter'> {cartProduct?.quantity} </span> 
                                        <button onClick={() => {addQty(item._id)}} > + </button>
                                    </div>
                                
                                }
                                {!cartProduct && 
                                    <>
                                        {addCart && <Button padding='5px 60px' eventHandler={()=>addItemToCart(item)}> Add to cart </Button>}
                                        
                                        { quantity && 
                                            <div className='qtyCount addSubtract'>
                                                {cartProduct?.quantity === 1 ? <button disabled> - </button> : <button onClick={() => {lessQty(item._id)}}> - </button> }
                                                <span className='counter'> {cartProduct?.quantity} </span> 
                                                <button onClick={() => {addQty(item._id)}}> + </button>
                                            </div>
                                        } 
                                    </>
                                }
                            </>
                        }
                        

                    </div>

                    {item.special ? <p> Category: <span  className='special'> Top Special </span> </p> : null}

                    <div className='share'>
                        
                            <p> Share on Facebook :
                                <FacebookShareButton url={currentPageUrl} quote=''>
                                    <FacebookIcon className='icons'></FacebookIcon>
                                </FacebookShareButton>
                            </p>

                            <p> Share on Twitter :
                                <TwitterShareButton url={currentPageUrl} title='I want to share this property with you'>
                                    <TwitterIcon className='icons'></TwitterIcon>
                                </TwitterShareButton>
                            </p>
                        
                            <p> Share on Whatsapp :
                                <WhatsappShareButton url={currentPageUrl} title='I want to share this property with you'>
                                    <WhatsappIcon className='icons'></WhatsappIcon>
                                </WhatsappShareButton>
                            </p>

                            <p> Share on Telegram :
                                <TelegramShareButton url={currentPageUrl} title='I want to share this property with you'>
                                    <TelegramIcon className='icons'></TelegramIcon>
                                </TelegramShareButton>
                            </p>
                        
                    </div>

                    <p> <span className='sellerInfo'> Seller information </span> : {item.sellerName} </p>

                </div>

            </div>

        )}

        {!isLoading &&
        <div className='descriptionReview'>


            <div className='links'>
                <Link className={description ? 'active' : null}  onClick={handleShowDescription}>  Description </Link >
                <Link className={review ? 'active' : null}  onClick={handleshowReview}>  Reviews <span className='numberOfReviews'> () </span> </Link >
            </div>

            {description && 
                <div className='description'> 
                    {detailedProduct.map((item, index) =>
                        <p key={index}> {item.description} </p>
                    )}
                </div>
            }

            {/* {review  ? 
                currentReview.length > 0 ? 
                    <div className='review'> 
                        {currentReview.map((rev, index) =>
                            <div key={index} className='userReview'>
                                <p> {rev.from} </p>
                                <p> {rev.text} </p>
                                {<Ratings rating={rev.rating}></Ratings>}
                            </div>
                        )}
                    </div> 
                : 
                    <div className='emptyReview'>
                        <p> No review avialble for this product</p>
                    </div>
            :
                null
            } */}

        </div>
        }
    
    </section>

    <Footer></Footer>
</>

)
}

export default Details
