import { useState, useEffect } from "react";


const UseValidateLoginform = (value) => {

const [errors, setError] = useState({})
const [invalids, setInvalid] = useState({})


const validate = (value) => {
    const newErrors = {};
    const newInvalid = {};

    for (const field in value) {
        if (field === 'username' && value[field].trim() === '') {
            newErrors[field] = 'Username field is empty';
            newInvalid[field] = true;
        }
        else if (field === 'password' && value[field].trim() === '') {
            newErrors[field] = 'Password field is empty';
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

export default UseValidateLoginform

