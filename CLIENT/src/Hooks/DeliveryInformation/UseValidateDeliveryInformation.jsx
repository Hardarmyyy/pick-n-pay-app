import { useState, useEffect } from "react";

const UseValidateDeliveryInformation = (value) => {

const [errors, setError] = useState({})

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validate = (value) => {

    const newErrors = {};

    for (const field in value) {
        if (field === 'firstName' && value[field].trim() === '') {
            newErrors[field] = 'First name is required';
        }
        else if (field === 'lastName' && value[field].trim() === '') {
            newErrors[field] = 'Last name is required';
        }
        else if (field === 'email' && value[field].trim() === '') {
            newErrors[field] = 'Email is required';
        }
        else if ((field === 'email' && value[field].trim() !== '') && !(emailRegex.test(value[field].trim()))) {
            newErrors[field] = 'Enter a valid email address';
        }
        else if (field === 'phoneNumber' && value[field].trim() === '') {
            newErrors[field] = 'Phone number is required';
        }
        else if (field === 'streetAddress' && value[field].trim() === '') {
            newErrors[field] = 'Street address is required';
        }
        else if (field === 'city' && value[field].trim() === '') {
            newErrors[field] = 'City is required';
        }
        else if (field === 'state' && value[field].trim() === '') {
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

export default UseValidateDeliveryInformation






