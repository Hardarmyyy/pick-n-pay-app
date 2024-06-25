import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FORGOTPASSWORD } from '../../../Services/authApi'
import {toast} from 'react-toastify'
import UseValidateForgotPasswordForm from './UseValidateForgotPasswordForm'


const UseForgotPassword = () => {

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const dispatch = useDispatch()
const status = useSelector((state) => state?.auth?.status)

// define a state to handle user email
const [user, setUser] = useState({
    email: ''
})

// define a state to handle email input change validation
const [error, setError] = useState({})

// define a state to handle user email input change
const handleChange = (e) => {
    const {name, value} = e.target
    setUser((user) => { return {...user, [name]: value.replace(/\s/g, "")} })

    if (name === 'email') {
        setError((error) => { return {...error, email: value ? emailRegex.test(value) ? '' : 'Enter a valid email address' : 'Enter email address'}})
    }
}

// import and UseValidateForgotPasswordForm hook to catch errors on form object ;
const {errors} = UseValidateForgotPasswordForm(user)

const [isSubmitting, setIsSubmitting] = useState(false);

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


return {status, user, error, handleChange, handleForgotPassword}
}

export default UseForgotPassword