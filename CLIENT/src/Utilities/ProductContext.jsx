import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios';



// define myProductContext;
export const myProductContext = createContext();

// define an empty array to hold the product categories
export const availableProductCategory = []


const ProductContextProvider = ({children}) => {

// fetch and get the available product categories
const [foundCategory, setFoundCategory] = useState([])
const [error, setError] = useState([])

const fetchProductCategories = async () => {
    axios
    .get('http://localhost:4050/api/category/all')
    .then((response) => {
        const categories = response?.data;
        // Arrange categories in alphabetical order by category name
        const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
        setFoundCategory(sortedCategories)
    })
    .catch((error) => {
        setError(error.response.data.error)
    })
}

useEffect(() => {
    fetchProductCategories()
}, [])

for (let i = 0; i < foundCategory.length; i++) {
    const element = foundCategory[i]?.name;
    if (availableProductCategory.find((productCategory) => productCategory === foundCategory[i]?.name) === undefined) {
            // building array with unique product category
            availableProductCategory.push(foundCategory[i]?.name);
    }
}

// define a function to get all products from every seller
const [allProducts, setAllProducts] = useState([])
const fetchAllProducts = () => {
    axios
    .get('http://localhost:4050/api/shop/all')
    .then((response) => {
        const result = response.data;
        setAllProducts(result);
    })
    .catch((error) => {
        
        // setTimeout(() => {setMessage(null)}, 1500)
    })
}
useEffect(() => {
    fetchAllProducts()
}, [])

// define an array to store and hold special products
const specialProducts = []
allProducts.map((item) => item.special ? specialProducts.push(item) : item)

// define a function to handle like products
const handleLike = (myProduct) => {
    let filtered = allProducts
    const updatedProduct = filtered.map(product => product._id === myProduct._id ? {...product, like: !product.like} : product)
    setAllProducts(updatedProduct)
}


// define a value variable to store all functions and variable 
const value = {
    handleLike,
    allProducts,
    specialProducts
}

return (

<myProductContext.Provider value={value}>
    {children}
</myProductContext.Provider>

)

}

export default ProductContextProvider