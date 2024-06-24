import { useState, useEffect } from "react";


const UseValidateLoginform = (value) => { 

const [errors, setError] = useState({})


const validate = (value) => {
    const newErrors = {};

    for (const field in value) {
        if (field === 'username' && value[field].trim() === '') {
            newErrors[field] = 'Username field is required';
        }
        else if (field === 'password' && value[field].trim() === '') {
            newErrors[field] = 'Password field is required';
        }
    }

    setError(newErrors)
}

useEffect(() => {
    validate(value)
}, [value])  


return {errors}

}

export default UseValidateLoginform

