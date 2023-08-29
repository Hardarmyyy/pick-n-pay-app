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
    if (availableProductCategory.find((productCategory) => productCategory === element) === undefined) {
            // building array with unique product category
            availableProductCategory.push(element);
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


// fetch and get the available products brands
let foundBrands = []
let product = allProducts

for (let i = 0; i < allProducts.length; i++) {
        product[i] = {...product[i]}

        if (foundBrands.find((brand) => brand === product[i].brand) === undefined) {
            foundBrands.push(product[i].brand)
        }
}



// define a value variable to store all functions and variable 
const value = {
    allProducts,
    specialProducts,
    foundBrands
}

return (

<myProductContext.Provider value={value}>
    {children}
</myProductContext.Provider>

)

}

export default ProductContextProvider