import React from 'react'
import { useState, useEffect } from "react";


const UseValidateUpdateShipping = (value) => {

    const [errors, setError] = useState({})

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validate = (value) => {

    const newErrors = {};

    for (const field in value) {
        if (field === 'firstName' && !value[field]?.replace(/\s/g, "")) {
            newErrors[field] = 'First name is required';
        }
        else if (field === 'lastName' && !value[field]?.replace(/\s/g, "")) {
            newErrors[field] = 'Last name is required';
        }
        else if (field === 'email' && !value[field]?.replace(/\s/g, "")) {
            newErrors[field] = 'Email is required';
        }
        else if ((field === 'email' && value[field]?.replace(/\s/g, "")) && !(emailRegex.test(value[field]?.replace(/\s/g, "")))) {
            newErrors[field] = 'Enter a valid email address';
        }
        else if (field === 'phoneNumber' && !value[field]) {
            newErrors[field] = 'Phone number is required';
        }
        else if (field === 'streetAddress' && !value[field]?.replace(/\s/g, "")) {
            newErrors[field] = 'Street address is required';
        }
        else if (field === 'city' && !value[field]?.replace(/\s/g, "")) {
            newErrors[field] = 'City is required';
        }
        else if (field === 'state' && !value[field]?.replace(/\s/g, "")) {
            newErrors[field] = 'State is required';
        }
    }

    setError(newErrors)
}

useEffect(() => {
    validate(value)
}, [value])  


    return {errors}
}

export default UseValidateUpdateShipping