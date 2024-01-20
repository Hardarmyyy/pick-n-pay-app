import React from 'react'
import { useState, useEffect } from 'react'
import UseValidateForgotPasswordForm from '../../Hooks/Auth/ForgotPassword/UseValidateForgotPasswordForm'
import { toast } from 'react-toastify'

const UseFooter = () => {

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// define a state to handle user email
const [user, setUser] = useState({
    email: ''
})

const [error, setError] = useState({})

const handleChange = (e) => {
    
    const {name, value} = e.target
    setUser((user) => { return {...user, [name]: value.replace(/\s/g, "")} })

    if (name === 'email') {
        setError((error) => { return {...error, email: value ? emailRegex.test(value) ? '' : 'Enter a valid email address' : 'Enter email address'}})
    }
}

const {errors} = UseValidateForgotPasswordForm (user)

const handleCanSave = (value) => {
    const canSubmit = Boolean(emailRegex.test(value.email)) // enable the submit button 
    return canSubmit
}

const isSave = handleCanSave(user)

const handleFormSubmit = () => {

    setError(errors)

    if(isSave) {
        toast.success('Thank you!. Updates will be sent to your email address', {
            toastStyle: { background: 'green', color: 'white' }
        })
        setUser({
            email: ''
        })
    }
}

useEffect(() => {
    handleCanSave(user)
}, [user])
  
return {user, error, handleChange, handleFormSubmit}

}

export default UseFooter