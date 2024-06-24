import { useState, useEffect } from "react";

const UseValidateForgotPasswordForm = (value) => {

    const [errors, setError] = useState({})
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const validate = (value) => {
        const newErrors = {};
    
        for (const field in value) {
            if (field === 'email' && value[field].trim() === '') {
                newErrors[field] = 'Email field is required';
            }
            else if ((field === 'email' && value[field].trim() !== '') && !(emailRegex.test(value[field].trim()))) {
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

export default UseValidateForgotPasswordForm

