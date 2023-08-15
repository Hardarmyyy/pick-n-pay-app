import React from 'react'
import { createContext } from "react";
import {useState, useEffect} from 'react'
import axios from 'axios'
import ProductData from '../../Data/Products.json'

export const myUserContext = createContext();



const UserContextProvider = ({children}) => {

// define a state to check if user is registered or public;

const [user, setUser] = useState({
    token: null,
    usertype: null,
    username: null,
    cartProducts: null,
    favourites: null,
    orders: null,
    shop: null,
    order: null
})

// define a function to get all users;
const [allUser, setAllUsers] = useState([])

const fetchAllUsers = () => {
    axios
    .get('http://localhost:4050/api/user/all')
    .then((response) => {
        const resultBuyers = response.data.allUsers.buyers;
        const resultSellers = response.data.allUsers.sellers;
        setAllUsers((resultBuyers.concat(resultSellers)));
    })
    .catch((error) => {
        
        // setTimeout(() => {setMessage(null)}, 1500)
    })
}
useEffect(() => {
    fetchAllUsers()
}, [])


// define a state to store the number of products added in the cart;
const [cartCounter, setCartCounter] = useState(user?.cartProducts?.length)

// define a state to handle when the product is added to cart successfully;
const [addProductMessage, setAddProductMessage] = useState(null)

// define a state to handle when the product is existing in the cart before;
const [addProductError, setaddProductError] = useState(null)

// define a state to handle when the product is added to favorites successfully;
const [likeMessage, setLikeMessage] = useState('')

// define a state to handle when the product is removed from favorites succesfully;
const [unlikeMessage, setUnlikeMessage] = useState('') 

// define a state to store the number of products in favourites;
const [favouritesCounter, setFavouritesCounter] = useState(user.favourites?.length)

let sellerLoginSuccess = (token, usertype, username, shop, order) => {
    setUser((user) => { return {...user, token,  usertype, username, shop, order}});
}

let buyerLoginSuccess = (token, usertype, username, cartProducts, favourites, orders) => {
    setUser((user) => { return {...user, token, usertype, username, cartProducts, favourites, orders}});
    setCartCounter(cartProducts.length)
    setFavouritesCounter(favourites.length);
}

const handleSignOut = () => {
    setUser((user) => { return {...user, usertype: null, username: null, cartProducts: [], favourites: [], orders: null, shop: null, order:null} })
    setCartCounter(null)
    setFavouritesCounter(null)
}

// define a function to handle add products to cart;
const handleAddProducts = (product) => { 
    const item = {
        price: product.price, 
        quantity: 1
    }
    // send a post request to the server
    axios
    .post('http://localhost:4050/api/cart/add/'+ user.username + '/' + product._id, item )
    .then((response) => {
        setAddProductMessage('Product added to cart successfully')
        setTimeout(()=>{ 
            setAddProductMessage(null)
        }, 1200)
    })
    .catch((error) => {
        setaddProductError(error.response.data.error)
        setTimeout(() => {
            setaddProductError(null)
        }, 1200)
    })
}

// define a state to store cart information in the cart and a function to fetch all products in the cart;
const [loading, setLoading] = useState(null)
const [subTotal, setSubTotal] = useState(null)

const getAllCartProducts = () => {
    setLoading(true)
    // send a get request to the server
    axios
    .get('http://localhost:4050/api/cart/all/'+ user.username)
    .then((response) => {
        setTimeout(() => {
            setLoading(false)
        },800)
        const result = response?.data?.cart?.myCart
        setCartCounter(result?.length)
        setUser((user) => {return {...user, cartProducts: result}})
        setSubTotal(result.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0))
    })
    .catch((error) => {
        
    })
}

// define a state to show when cart has been emptied succesfully and a function to manage empty cart;
const [cartMessage, setCartMessage] = useState(null)

const handleEmptyCart = () =>  {
    setUser((user) => {return {...user, cartProducts: null}}) 
    setCartCounter(null)
    // send a delet request to the server
    axios
    .delete('http://localhost:4050/api/cart/empty/'+user.username)
    .then((response) => {
        setCartMessage('cart has been discarded')
        setTimeout(() => {
            setCartMessage(null)
        }, 1200)
    })
    .catch((error) => {
        setCartMessage('Something went wrong')
    })
}

//define a state to show when a product is removed from cart and a function to manage when a product is removed from cart
const [deletedItemMessage, setDeletedItemMessage] = useState(null)

const removeProduct = (id) => {
    let cart = user.cartProducts;
    cart.map((item) => item.productId === id && setCartCounter((cartCounter) => cartCounter - item.quantity))
    const updatedCart = user.cartProducts.filter((item) => item.productId !== id)
    setUser((user) => {return {...user, cartProducts: updatedCart}})
    setSubTotal(updatedCart.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0))
    // send a delete request to the server
    axios
    .delete('http://localhost:4050/api/cart/delete/'+ user.username + '/' + id) 
    .then((response) => {
        setDeletedItemMessage('product has been removed from cart')
        setTimeout(() => {
            setDeletedItemMessage(null)
        }, 1200)
    })
    .catch((error) => {
        setDeletedItemMessage('something went wrong')
    })
    
}

// define a function to increase the product quantity in the cart
const addQty = (id) => {
    let cart = user.cartProducts;
    const updatedCart = cart.map((product) => product.productId === id ? {...product, quantity: product.quantity + 1} : product)
    setCartCounter((cartCounter) => cartCounter + 1)
    setSubTotal(cart.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0))
    setUser((user) => {return {...user, cartProducts: cart}})
    // send a patch request to the server;
    axios
    .patch('http://localhost:4050/api/cart/increment/'+ user.username + '/' + id) 
    .then((response) => {
        
        // setTimeout(() => {
        //     setDeletedItemMessage(null)
        // }, 1200)
    })
    .catch((error) => {
        
    })
}

// define a function to less product qty
const lessQty = (id) => {
    let cart = user.cartProducts;
    cart.map((product) => product.id === id && product.qty > 1 && setCartCounter((cartCounter) => cartCounter - 1))
    const updatedCartCounter = cart.map((product) => product.id === id ? {...product, qty: product.qty > 1 ? product.qty - 1 : product.qty} : product)
    setTotalPrice(updatedCartCounter.reduce((totalPrice, product) => totalPrice + product.productPrice * product.qty, 0))
    setUser((user) => {return {...user, cartProducts: updatedCartCounter}})
}

useEffect(() => {
    getAllCartProducts()
}, [addProductMessage, user.username]);


// define a function to handle add products to favourites;
const handleAddToFavourites = (myProduct) => {
    let myFavourites = user.favourites;
    // get all products from the json file;
    const allProduct = ProductData.Products
    const likedProduct = allProduct.map(product => product.id === myProduct.id ? {...product, like: !product.like} : product)
    myFavourites.push(likedProduct)
    setLikeMessage('product added to favourites')
    setTimeout(()=>{ setLikeMessage('')}, 1200)
    setFavouritesCounter((favouritesCounter) => favouritesCounter + 1)
    setUser((user) => {return {...user, favourites: myFavourites}})
}

// define a function to handle remove products from favourites;
const handleRemoveFromFavourites = (myProduct) => {
    let myFavourites = user.favourites;
    const updatedFavorite = myFavourites.filter((product)=> product.id !== myProduct.id)
    setUnlikeMessage('product removed from favourites')
    setTimeout(()=>{ setUnlikeMessage('')}, 1200)
    setFavouritesCounter((favouritesCounter) => favouritesCounter - 1)
    setUser((user) => {return {...user, favourites: updatedFavorite}})
}





// define a value variable to store all functions and variable 
const value = {
    user,
    allUser,
    handleAddProducts,
    loading,
    subTotal,
    cartMessage,
    handleEmptyCart,
    deletedItemMessage,
    removeProduct,
    handleAddToFavourites,
    handleRemoveFromFavourites,
    addProductMessage,
    addProductError,
    likeMessage,
    unlikeMessage,
    favouritesCounter,
    cartCounter,
    addQty,
    lessQty,
    sellerLoginSuccess,
    buyerLoginSuccess,
    handleSignOut
}

// define a useEffect hook to keep the user logged in while using the app;

useEffect (() => {
    const currentBuyer = localStorage.getItem('buyer')
    const currentSeller = localStorage.getItem('seller')
    if (currentBuyer) {
        setUser(JSON.parse(currentBuyer));
    }
    else if (currentSeller) {
        setUser(JSON.parse(currentSeller));
    }
}, []);

return (

    <myUserContext.Provider value={value}>
        {children}
    </myUserContext.Provider>

)
}

export default UserContextProvider;
