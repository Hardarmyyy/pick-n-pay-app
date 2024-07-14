import React from 'react'
import { useState, useEffect } from 'react'

const UseValidateChangePassword = (value) => {

    const [errors, setError] = useState({})
    
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
                newErrors[field] = 'Password must be at least 8 characters long';
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