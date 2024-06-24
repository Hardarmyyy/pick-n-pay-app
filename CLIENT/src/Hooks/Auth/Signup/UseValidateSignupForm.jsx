import React from 'react'
import { useState, useEffect } from "react";

const UseValidateSignupForm = (value) => {

    const [errors, setError] = useState({})

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    
    const validate = (value) => {
        const newErrors = {};
        const newInvalid = {};
    
        for (const field in value) {
            if (field === 'userRole' && value[field].trim() === '') {
                newErrors[field] = 'Kindly choose a user profile';
            }
            else if (field === 'username' && value[field].trim() === '') {
                newErrors[field] = 'Username field is required';
                newInvalid[field] = true;
            }
            else if (field === 'username' && value[field].trim() !== '' && value[field].length < 8) {
                newErrors[field] = 'Username must be at least 8 characters!';
                newInvalid[field] = true;
            }
            else if (field === 'email' && value[field].trim() === '') {
                newErrors[field] = 'Email field is required';
                newInvalid[field] = true;
            }
            else if ((field === 'email' && value[field].trim() !== '') && !(emailRegex.test(value[field].trim()))) {
                newErrors[field] = 'Enter a valid email address';
                newInvalid[field] = true;
            }
            else if (field === 'password' && value[field].trim() === '') {
                newErrors[field] = 'Password field is required';
                newInvalid[field] = true;
            }
            else if (field === 'password' && value[field].trim() !== '' && value[field].length < 8 ) {
                newErrors[field] = 'Password must be at least 8 characters long';
                newInvalid[field] = true;
            }
        }
    
        setError(newErrors)
    }
    
    useEffect(() => {
        validate(value)
    }, [value]) 
    
    
    return {errors}

}

export default UseValidateSignupForm