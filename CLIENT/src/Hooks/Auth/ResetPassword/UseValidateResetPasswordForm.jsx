import { useState, useEffect } from "react";

const UseValidateResetPasswordForm = (value) => {

const [errors, setError] = useState({})


const validate = (value) => {
    const newErrors = {};

    for (const field in value) {
        if (field === 'password' && value[field].trim() === '') {
            newErrors[field] = 'Password field is required';
        }
        else if (field === 'password' && value[field].trim() !== '' && value[field].length < 8 ) {
            newErrors[field] = 'Password must be at least 8 characters';
        }
        else if (field === 'confirmPassword' && value[field].trim() === '') {
            newErrors[field] = 'Confirm password field is required';
        }
        else if (field === 'confirmPassword' && value[field].trim() !== '' && value[field] !== value.password ) {
            newErrors[field] = 'Password does not match';
        }
    }

    setError(newErrors)
}

useEffect(() => {
    validate(value)
}, [value]) 


return {errors}
}

export default UseValidateResetPasswordForm