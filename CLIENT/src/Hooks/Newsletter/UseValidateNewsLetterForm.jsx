import React from 'react'
import { useState, useEffect } from "react";

const UseValidateNewsLetterForm = (value) => {

    const [errors, setError] = useState({})
    const [invalids, setInvalid] = useState({})

    const validate = (value) => {

        const newErrors = {};
        const newInvalids = {};
    
        for (const field in value) {

            if (field === 'username' && value[field].trim() === '') {
                newErrors[field] = 'Name is required';
                newInvalids[field] = true;
            }
            else if (field === 'email' && value[field].trim() === '') {
                newErrors[field] = 'Email is required';
                newInvalids[field] = true;
            }
        }
    
        setError(newErrors)
        setInvalid(newInvalids)
    }
    
    useEffect(() => {
        validate(value)
    }, [value]) 
    
    
    
  return {errors, invalids}
}

export default UseValidateNewsLetterForm