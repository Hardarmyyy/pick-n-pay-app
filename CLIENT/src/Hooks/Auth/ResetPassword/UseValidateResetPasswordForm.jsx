import { useState, useEffect } from "react";

const UseValidateResetPasswordForm = (value) => {

const [errors, setError] = useState({})
const [invalids, setInvalid] = useState({})

// Regex for form values
// const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*].{8,}$/;
const passwordRegexUpperCase = /^(?=.*[A-Z])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
const passwordRegexNumber = /^(?=.*[0-9])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
const passwordRegexSymbol = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;


const validate = (value) => {
    const newErrors = {};
    const newInvalid = {};

    for (const field in value) {
        if (field === 'password' && value[field].trim() === '') {
            newErrors[field] = 'Password field is required';
            newInvalid[field] = true;
        }
        else if (field === 'password' && value[field].trim() !== '' && value[field].length < 8 ) {
            newErrors[field] = 'Password must be at least 8 characters';
            newInvalid[field] = true;
        }
        else if ((field === 'password' && value[field].trim() !== '') && !(passwordRegexUpperCase.test(value[field]))) {
            newErrors[field] = 'Password must contain at least one uppercased letter!';
            newInvalid[field] = true;
        }
        else if ((field === 'password' && value[field].trim() !== '') && !(passwordRegexNumber.test(value[field]))) {
            newErrors[field] = 'Password must contain at least one number!';
            newInvalid[field] = true;
        }
        else if ((field === 'password' && value[field].trim() !== '') && !(passwordRegexSymbol.test(value[field]))) {
            newErrors[field] = 'Password must contain at least one symbol!';
            newInvalid[field] = true;
        }
        else if (field === 'confirmPassword' && value[field].trim() === '') {
            newErrors[field] = 'Confirm password field is required';
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

export default UseValidateResetPasswordForm