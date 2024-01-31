import React from 'react'
import { useState, useEffect } from 'react'

const UseValidateUpdateProduct = (value) => {

    const [errors, setError] = useState({})
    
    const validate = (value) => {
        const newErrors = {};
    
        for (const field in value) {
            if (field === 'title' && !value[field]?.replace(/\s/g, "")){
                newErrors[field] = 'Product title is required';
            }
            else if (field === 'price' && !value[field]) {
                newErrors[field] = 'Price is required';
            }
            else if (field === 'price' && Number(value[field]) <= 0) {
                newErrors[field] = 'Price value must be greater than 0';
            }
            else if (field === 'description' && !value[field]?.replace(/\s/g, "")) {
                newErrors[field] = 'Description is required';
            }
            else if (field === 'category' && !value[field]) {
                newErrors[field] = 'Please select a category';
            }
            else if (field === 'countInStock' && !value[field]) {
                newErrors[field] = 'Quantity is required';
            }
            else if (field === 'countInStock' && Number(value[field]) < 1) {
                newErrors[field] = 'Minimum quantity must be greater than 0';
            }
        }
    
        setError(newErrors)
    }
    
    useEffect(() => {
        validate(value)
    }, [value]) 
    
    
    return {errors}
    
}

export default UseValidateUpdateProduct