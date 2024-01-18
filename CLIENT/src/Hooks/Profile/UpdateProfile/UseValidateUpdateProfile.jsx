import React from 'react'
import { useState, useEffect } from 'react';



const UseValidateUpdateProfile = (value) => {

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const [errors, setError] = useState({})

const validate = (value) => {
    const newErrors = {};

    for (const field in value) {
        if (field === 'username' && value[field]?.trim() === '') {
            newErrors[field] = 'Username field is required';
        }
        else if (field === 'email' && value[field]?.trim() === '') {
            newErrors[field] = 'Email field is required';
        }
        else if ((field === 'email' && value[field]?.trim() !== '') && !(emailRegex.test(value[field]?.trim()))) {
            newErrors[field] = 'Enter a valid email address';
        }
    }

    setError(newErrors)
}

useEffect(() => {
    validate(value)
}, [value])  

    return {errors}
}

export default UseValidateUpdateProfile