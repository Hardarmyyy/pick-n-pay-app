import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FORGOTPASSWORD } from '../../../Services/authApi'
import {toast} from 'react-toastify'
import UseValidateForgotPasswordForm from './UseValidateForgotPasswordForm'


const UseForgotPassword = () => {

const dispatch = useDispatch()

// define a state to handle user email
const [user, setUser] = useState({
    email: ''
})

// define a state to handle email input change validation
const [error, setError] = useState({})
const [invalid, setInvalid] = useState({})

// define a state to handle user email input change
const handleChange = (e) => {
    const {name, value} = e.target
    setUser((user) => { return {...user, [name]: value.replace(/\s/g, "")} })

    if (name === 'email') {
        setError((error) => { return {...error, email: value ? '' : 'Kindly enter email address'}})
        setInvalid((invalid) => { return {...invalid, email: value ? false : true }})
    }
}

// import and UseValidateForgotPasswordForm hook to catch errors on form object ;
const {errors, invalids} = UseValidateForgotPasswordForm(user)

const [isSubmitting, setIsSubmitting] = useState(false);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const handleCanSave = (value) => {
    const canSubmit = Boolean(emailRegex.test(value.email)) // enable the submit button 

    return canSubmit
}

const isSave = handleCanSave(user)

const handleForgotPassword = async () => {

    setError(errors)

    if (isSubmitting) return; // Don't submit the form if it's already submitting
    
    if (isSave && !isSubmitting) {

        setIsSubmitting(true); 
        await dispatch(FORGOTPASSWORD(user))
        .then((response) => {
            if (response.payload.message) {
                setUser({
                    email: ''
                })
            }
        })
        .catch((err) => {
            toast.error('Something went wrong', {
                toastStyle: { background: 'red', color: 'white' }
            })
        })
        .finally(() => {
            setIsSubmitting(false);
        })
    }
}

useEffect(() => {
    handleCanSave(user)
}, [user])


return {user, error, invalid, handleChange, handleForgotPassword}
}

export default UseForgotPassword