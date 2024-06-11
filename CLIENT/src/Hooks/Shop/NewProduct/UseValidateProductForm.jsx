import React from 'react'
import { useState, useEffect } from 'react'

const UseValidateProductForm = (value) => {

  const [errors, setError] = useState({})

  const validate = (value) => {
    const newErrors = {};

    for (const field in value) {
        if (field === 'title' && value[field]?.trim() === '') {
            newErrors[field] = 'Product title is required';
        }
        else if (field === 'price' && value[field]?.trim() === '') {
            newErrors[field] = 'Price is required';
        }
        else if (field === 'price' && Number(value[field]) <= 0) {
            newErrors[field] = 'Price value must be greater than 0';
        }
        else if (field === 'description' && value[field]?.trim() === '') {
            newErrors[field] = 'Description is required';
        }
        else if (field === 'category' && value[field]?.trim() === '') {
            newErrors[field] = 'Please select a category';
        }
        else if (field === 'category' && value[field]?.trim() === 'Choose category') {
            newErrors[field] = 'Please select a valid category';
        }
        else if (field === 'countInStock' && value[field]?.trim() === '') {
            newErrors[field] = 'Minimum quantity is required';
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

export default UseValidateProductForm