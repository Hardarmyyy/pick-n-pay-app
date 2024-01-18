import React from 'react'
import { useState, useEffect } from 'react'

const UseValidateChangePassword = (value) => {

    const [errors, setError] = useState({})

    const passwordRegexUpperCase = /^(?=.*[A-Z])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
    const passwordRegexNumber = /^(?=.*[0-9])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
    const passwordRegexSymbol = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
    
    
    const validate = (value) => {

        const newErrors = {};
    
        for (const field in value) {
            if (field === 'currentPassword' && value[field].trim() === '') {
                newErrors[field] = 'Enter current password';
            }
            if (field === 'newPassword' && value[field].trim() === '') {
                newErrors[field] = 'Enter new password';
            }
            if (field === 'confirmPassword' && value[field].trim() === '') {
                newErrors[field] = 'Confirm new password';
            }
            else if (field === 'newPassword' && value[field].trim() !== '' && value[field].length < 8 ) {
                newErrors[field] = 'New password must be at least 8 characters long';
            }
            else if ((field === 'newPassword' && value[field].trim() !== '') && !(passwordRegexUpperCase.test(value[field]))) {
                newErrors[field] = 'New password must contain at least one uppercased letter!';
            }
            else if ((field === 'newPassword' && value[field].trim() !== '') && !(passwordRegexNumber.test(value[field]))) {
                newErrors[field] = 'New password must contain at least one number!';
            }
            else if ((field === 'newPassword' && value[field].trim() !== '') && !(passwordRegexSymbol.test(value[field]))) {
                newErrors[field] = 'New password must contain at least one symbol!';
            }
        }
    
        setError(newErrors)
    }
    
    useEffect(() => {
        validate(value)
    }, [value]) 
    
    
    return {errors}
}

export default UseValidateChangePassword