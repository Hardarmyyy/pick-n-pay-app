import { useState, useEffect } from "react";

const UseValidateForgotPasswordForm = (value) => {

    const [errors, setError] = useState({})
    const [invalids, setInvalid] = useState({})
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const validate = (value) => {
        const newErrors = {};
        const newInvalid = {};
    
        for (const field in value) {
            if (field === 'email' && value[field].trim() === '') {
                newErrors[field] = 'Email field is empty';
                newInvalid[field] = true;
            }
            else if ((field === 'email' && value[field].trim() !== '') && !(emailRegex.test(value[field].trim()))) {
                newErrors[field] = 'Kindly enter a valid email address';
                newInvalid[field] = true;
            }
        }
    
        setError(newErrors)
        setInvalid(newInvalid)
    
    }
    
    useEffect(() => {
        validate(value)
    }, [value]) 
    
    return {errors, invalids}
}

export default UseValidateForgotPasswordForm

