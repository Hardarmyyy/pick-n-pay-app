import React from 'react'
import '../Details/Details.css'
import { useParams, Link } from 'react-router-dom'
import Navigation from '../../Navigation/Navigation';
import Footer from '../../Footer/Footer';
import { useContext, useState } from 'react';
import { myProductContext } from '../../../../Utilities/ProductContext';
import { myUserContext } from '../../../../Utilities/UserContext';
import Button from '../../../../Utilities/Button';
import { BsBagHeart } from "react-icons/bs";
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton,TelegramShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon} from "react-share";
import Ratings from './Ratings/Ratings';


const Details = () => {
// define a variable to store the current page location for the social share icons;
const currentPageUrl = window.location.href;

// import user from myUserContext and destructure it contents;
const {user, cartCounter, handleAddToFavourites, handleRemoveFromFavourites, handleAddProducts, 
    addProductMessage, addProductError, likeMessage, unlikeMessage} = useContext(myUserContext) 

const {username} = user

// catch the id property using useParams hook; 
const {id} = useParams();

// import allproducts from myProductContext;
const {allProducts, handleLike} = useContext(myProductContext);

// filter the exact product that match with type property;
const detailedProduct = allProducts.filter((product) => product._id === id);

// define a function to toggle addToFavourites and Like
const likeAddtoFavourites = (prod) => {
    handleLike(prod)
    handleAddToFavourites(prod)
}

// define a function to toggle removeFavourites and unLike
const unLikeRemoveFavourites = (prod) => {
    handleLike(prod)
    handleRemoveFromFavourites(prod)
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

return (

<> 
    <Navigation username={username} cartCounter={cartCounter}></Navigation>
    
    {addProductMessage && <p className='addProductMessage'> {addProductMessage} </p>}

    {addProductError && <p className='addProductError'> {addProductError} </p>}

    {likeMessage && <p className='likeMessage'> {likeMessage} </p>}

    {unlikeMessage && <p className='unlikeMessage'> {unlikeMessage} </p>}

    <section className='detailsContainer'>

        {detailedProduct.map((item) =>

            <div key={item._id} className='wrapperDetails'>  

                {item.like ? 
                    <BsBagHeart className='likesIcon' onClick={()=>{unLikeRemoveFavourites(item)}}></BsBagHeart> 
                : 
                    <BsBagHeart className='unlikesIcon' onClick={()=>{likeAddtoFavourites(item)}}></BsBagHeart> 
                }

                <div className='centerImage'>
                    <img src={`../../../../../public/productphoto/${item.photo[0].filename}`} alt={item.title}/>
                </div>

                <div className='info'>

                    <h3> {item.title} </h3>
                    <p className='pricey'> $ {item.price} </p>
                    <p> {item.description.slice(0,150)} </p>

                    <div className='qtyCount'>
                        <Button padding='5px 60px' eventHandler={()=>handleAddProducts(item)}> Add to cart </Button>
                    </div>

                    {item.special ? <p> Category: Top Special </p> : null}

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

        <div className='descriptionReview'>


            <div className='links'>
                <Link className={description ? 'active' : null}  onClick={handleShowDescription}>  Description </Link >
                <Link className={review ? 'active' : null}  onClick={handleshowReview}>  Reviews <span className='numberOfReviews'> () </span> </Link >
            </div>

            {description && 
                <div className='description'> 
                    {detailedProduct.map((item) =>
                        <p key={item.id}> {item.description} </p>
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
    
    </section>

    <Footer></Footer>
</>

)
}

export default Details
