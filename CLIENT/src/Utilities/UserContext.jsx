import React from 'react'
import { createContext } from "react";
import {useState, useEffect} from 'react'
import axios from 'axios'

export const myUserContext = createContext();



const UserContextProvider = ({children}) => {

// define a state to check if user is registered or public;

const [user, setUser] = useState({
    token: null,
    usertype: null,
    username: null,
    cartProducts: [],
    favourites: [],
    orders: [],
    shop: [],
    order: []
})

//define a state to show isloading before the data is fetched
const [isLoading, setIsLoading] = useState(true)

// define a function to get all users;
const [allUser, setAllUsers] = useState([])

const fetchAllUsers = () => {
    axios
    .get('http://localhost:4050/api/user/all')
    .then((response) => {
        const resultBuyers = response?.data?.allUsers?.buyers;
        const resultSellers = response?.data?.allUsers?.sellers;
        setAllUsers((resultBuyers.concat(resultSellers)));
    })
    .catch((error) => {
        
        // setTimeout(() => {setMessage(null)}, 1500)
    })
}

// define a function to get all products from every seller
const [allProducts, setAllProducts] = useState([])
const fetchAllProducts = async () => {
    await axios
    .get('http://localhost:4050/api/shop/all')
    .then((response) => {
        const result = response.data;
        setAllProducts(result);
    })
    .catch((error) => {
        
        // setTimeout(() => {setMessage(null)}, 1500)
    })
    setTimeout(() => {
        setIsLoading(false)
    }, 1200)
}

useEffect(() => {
    fetchAllUsers()
    fetchAllProducts()
}, [])


// define a state to store the number of products added in the cart;
const [cartCounter, setCartCounter] = useState(user?.cartProducts?.length)

// define a state to store the totalPrice of products added in the cart;
const [subTotal, setSubTotal] = useState(0)

// define a state to store the number of products in favourites;
const [favouritesCounter, setFavouritesCounter] = useState(user.favourites?.length)

let sellerLoginSuccess = (token, usertype, username, cartProducts, shop, order) => {
    setUser((user) => { return {...user, token,  usertype, username, cartProducts, shop, order}});
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

// define a state to show when cart has been emptied succesfully and a function to manage empty cart;

const [cartMessage, setCartMessage] = useState(null)

const handleEmptyCart = () =>  {
    setUser((user) => {return {...user, cartProducts: []}})
    setCartCounter(null)
    axios
    .delete('http://localhost:4050/api/cart/empty/' + user.username)
    .then((response) => {
        setCartMessage('Cart has been discarded')
        setTimeout(() => {
        setCartMessage(null)
    }, 1000)
    })
    .catch((error) => {
        setCartMessage('Something went wrong')
        setTimeout(() => {
        setCartMessage(null)
    }, 1000)
    })
    
}

// define a state to handle when the product is added to cart successfully;
const [addProductMessage, setAddProductMessage] = useState(null)
const [addProductError, setAddProductError] = useState(null)

const handleAddProducts = (product, id) => {

        const item = {
            price: product.price,
            quantity: 1
        }
        // send a post request to the server adding the product
        axios.post('http://localhost:4050/api/cart/add/' + user.username + '/' + id, item)
        .then((response) => {
            setAddProductMessage('Product added to cart successfully')
            setCartCounter((cartCounter) => cartCounter + 1)
            setTimeout(()=>{ 
                setAddProductMessage('')
            }, 1200)

        })

        .catch((error) => {
            setAddProductError(error.response.data.error)
            setTimeout(()=>{ 
                setAddProductError('')
            }, 1200)
        })

}

//define a state to show when a product is removed from cart and a function to manage when a product is removed from cart
const [deletedItemMessage, setDeletedItemMessage] = useState(null)

const removeProduct = (id) => {
    axios
    .delete('http://localhost:4050/api/cart/delete/' + user.username + '/' + id)
    .then((response) => {
        let cart = user.cartProducts;
        cart.map((product) => product.productId === id && setCartCounter((cartCounter) => cartCounter - product.quantity))   
        const filteredCart = cart.filter((product) => product.productId !== id )
        setDeletedItemMessage('product has been removed from cart')
        setTimeout(() => {
            setDeletedItemMessage(null)
        }, 1200)
        setSubTotal(filteredCart.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0))
        setUser((user) => {return {...user, cartProducts: filteredCart}})

    })
    .catch((error) => {
        setDeletedItemMessage('Something went wrong')
        setTimeout(() => {
            setDeletedItemMessage(null)
        }, 1200)
    })
}

// define a function to increment the product quantity in the cart
const [quantityMessage, setQuantityMessage] = useState(null)
const [quantityMessageError, setQuantityMessageError] = useState(null)

const addQty = (id) => {
    axios
    .patch('http://localhost:4050/api/cart/increment/' + user.username + '/' + id)
    .then((response) => {
        let cart = user.cartProducts;
        const updatedCart = cart.map((product) => product.productId === id ? {...product, quantity: product.quantity + 1} : product)
        setCartCounter((cartCounter) => cartCounter + 1)
        setQuantityMessage('quantity updated successfully')
        setTimeout(() => {
            setQuantityMessage(null)
        }, 1200)
        setSubTotal(updatedCart.reduce((totalPrice, product) => totalPrice + product.price * product.quantity , 0))
        setUser((user) => {return {...user, cartProducts: updatedCart}})
    })
    .catch((error) => {
        setQuantityMessageError('Product is out of stock')
        setTimeout(() => {
            setQuantityMessageError(null)
        }, 1200)
    })
    
}

// define a function to decrement the product quantity in the cart
const lessQty = (id) => {

    axios
    .patch('http://localhost:4050/api/cart/decrement/' + user.username + '/' + id)
    .then((response) => {
        let cart = user.cartProducts;
        const updatedCart = cart.map((product) => product.productId === id ? { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : product.quantity} : product)
        cart.map((product) => product.productId === id  && product.quantity > 1 && setCartCounter((cartCounter) => cartCounter - 1))
        setQuantityMessage('quantity updated successfully')
        setTimeout(() => {
            setQuantityMessage(null)
        }, 1200)
        setSubTotal(updatedCart.reduce((totalPrice, product) => totalPrice + product.price * product.quantity , 0))
        setUser((user) => {return {...user, cartProducts: updatedCart}})
    })
    .catch((error) => {
        setQuantityMessageError('Minimum quantity for the product is 1')
        setTimeout(() => {
            setQuantityMessageError(null)
        }, 1200)
    })
}

// fecth the updated cart from the server;
useEffect(() => {
    axios
    .get('http://localhost:4050/api/cart/all/' + user.username)
    .then((response) => {
        const result = (response?.data?.cart?.myCart)
        const updatedCart = result.map((item) => {
            return {productId: item.productId, seller: item.seller, title: item.title, price: item.price / item.quantity, photo: item.photo, description: item.description, category: item.category, special: item.special, quantity: item.quantity}
        })
        setUser((user) => {return {...user, cartProducts: updatedCart}})
        setSubTotal(result.reduce((totalPrice, product) => totalPrice + product.price, 0))
        setCartCounter(result.reduce((count, product) => count + product.quantity, 0))
    })
    .catch((error) => {
        
    })
    setTimeout(() => {
        setIsLoading(false)
    }, 1200)
}, [addProductMessage, addProductError, deletedItemMessage, user.username])

// define a state to handle when product is added to favorites and a function to handle add products to favourites;
const [likeMessage, setLikeMessage] = useState(null)
const [likeMessageError, setLikeMessageError] = useState(null)


const handleAddToFavourites = (myProduct) => {
    const item = {
        price: myProduct.price,
        quantity: 1
    }
    axios
    .post('http://localhost:4050/api/favourites/add/' + user.username + '/' + myProduct._id, item)
    .then((response) => {

        setLikeMessage('product added to favourites')
        setFavouritesCounter((favouritesCounter) => favouritesCounter + 1)
        setTimeout(()=>{ 
            setLikeMessage(null)
        }, 1200) 

        let filtered = allProducts
        const updatedProducts = filtered.map((product) => product._id === myProduct._id ? {...product, like: !product.like} : product)
        setAllProducts(updatedProducts)

        //fetch the updated user favourites from the server;
        axios
        .get('http://localhost:4050/api/favourites/' + user.username)
        .then((response) => {
            const result = (response?.data?.favourites?.myFavourites)
            setFavouritesCounter(result.length)
            const updatedFavourites = result.map((item) => 
                {return {...item, like: !item.like}})
            setUser((user) => {return {...user, favourites: updatedFavourites}})

        })
        .catch((error) => {
            
        })
    })
    .catch((error) => {
        setLikeMessageError(error.response?.data.error)
        setTimeout(()=>{ 
            setLikeMessageError(null)
        }, 1200)
    })
}

// define a state to handle when the product is removed from favorites succesfully;
const [unlikeMessage, setUnlikeMessage] = useState(null) 

// define a function to handle remove products from favourites;
const handleRemoveFromFavourites = (id) => {
    axios
    .delete('http://localhost:4050/api/favourites/delete/' + user.username + '/' + id)
    .then((response) => {
        setUnlikeMessage('product removed from favourites')
        setFavouritesCounter((favouritesCounter) => favouritesCounter - 1)
        setTimeout(()=>{ 
            setUnlikeMessage(null)
        }, 800)
        let myFavourites = user.favourites;
        const updatedFavorite = myFavourites.filter((product)=> product.productId !== id)
        setUser((user) => {return {...user, favourites: updatedFavorite}})
        let filtered = allProducts
        const updatedProducts = filtered.map((product) => product._id === id ? {...product, like: !product.like} : product)
        setAllProducts(updatedProducts)
    })
    .catch((error) => {
        setLikeMessageError(error.response.data.error)
        setTimeout(()=>{ 
            setLikeMessageError(null)
        }, 1200)
    })
}

//fetch the updated user favourites from the server;
useEffect(() => {
    axios
    .get('http://localhost:4050/api/favourites/' + user.username)
    .then((response) => {

        const result = (response?.data?.favourites?.myFavourites)
        setFavouritesCounter(result.length)
        const updatedFavourites = result.map((item) => 
            {return {...item, like: !item.like}}
            )
        setUser((user) => {return {...user, favourites: updatedFavourites}})

    })
    .catch((error) => {
    
    })
    setTimeout(() => {
        setIsLoading(false)
    }, 1200)
}, [likeMessageError, user.username, favouritesCounter])


// define a state to manage all the products for the current seller shop;
const [shopItems, setShopItems] = useState(null)
const [message, setMessage] = useState(null)

// define a function to fetch all the products for the current seller shop;
useEffect(() => {
    axios
    .get('http://localhost:4050/api/shop/all/'+user.username)
    .then((response) => {
        const result = response.data;
        setShopItems(result?.allProductsWithSellerName);
    })
    .catch((error) => {
    
        setTimeout(() => {setMessage(null)}, 1500)
    })
    setTimeout(() => {
        setIsLoading(false)
    }, 2000)
}, [message, user.username]); 

// define a function to delete a product from the seller shop
const deleteProduct = (id) => {
    const deletedProduct = shopItems.filter((product) => product.productID === id )
    const updatedShop = shopItems.filter((product) => product.productID !== id)
    setShopItems(updatedShop)
    axios
    .delete('http://localhost:4050/api/shop/delete/'+username + '/' +deletedProduct[0].productID)
    .then((response) => {
        const result = response.data
        setMessage('product deleted successfully')
        setTimeout(() => {
            setMessage(null)
        }, 1000)
    })
    .catch((error) => {
        
        setTimeout(() => {setMessage(null)}, 1500)
    }) 
}

// define a value variable to store all functions and variable 
const value = {
    isLoading,
    user,
    allUser,
    allProducts,
    handleAddProducts,
    subTotal,
    cartMessage,
    handleEmptyCart,
    deletedItemMessage,
    removeProduct,
    addProductMessage,
    addProductError,
    cartCounter,
    quantityMessage,
    quantityMessageError,
    addQty,
    lessQty,
    likeMessage,
    likeMessageError,
    unlikeMessage,
    handleAddToFavourites,
    handleRemoveFromFavourites,
    favouritesCounter,
    sellerLoginSuccess,
    buyerLoginSuccess,
    handleSignOut,
    shopItems,
    message,
    deleteProduct
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
