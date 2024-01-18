import React from 'react'
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import UseValidateChangePassword from './UseValidateChangePassword';

const UseChangePassword = () => {

    const passwordRegexUpperCase = /^(?=.*[A-Z])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
    const passwordRegexNumber = /^(?=.*[0-9])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
    const passwordRegexSymbol = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
    
    const dispatch = useDispatch()
    
    // define state to manage form object data
    const [updatePassword, setUpdatepassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    
    const [error, setError] = useState({})
    
    // define a state to handle show password
    const [showPassword, setShowPassword] = useState(false)
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // define a function to handle form input state
    const handleChange = (e) => {
        const {name, value} = e.target;
    
        setUpdatepassword((updatePassword) => {return {...updatePassword, [name]: value.replace(/\s/g, "")}})

        // validating form state;
        if (name === 'currentPassword') {
            setError((error) => {return {...error, currentPassword: value ? '': 'Enter current password'}})
        }
        else if (name === 'newPassword') {
            setError((error) => {return {...error, newPassword: value ? '': 'Enter new password' }})
        }
        else if (name === 'confirmPassword') {
            setError((error) => { return {...error, confirmPassword: value ? '' : 'Confirm new password'}})
        }
    }
    
    // define a function to handle show password;
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    
    // import and use validatesignup hook to catch errors on the form object ;
    const {errors} = UseValidateChangePassword(updatePassword)
    
    const handleCanUpdate = (value) => {
        const canUpdatepassword = [
            value.currentPassword &&
            value.newPassword &&
            value.newPassword.length >= 8 &&
            passwordRegexUpperCase.test(value.newPassword) && 
            passwordRegexNumber.test(value.newPassword) && 
            passwordRegexSymbol.test(value.newPassword) && 
            value.confirmPassword
        ].every(Boolean)
    
        return canUpdatepassword
    }
    
    const canUpdate = handleCanUpdate(updatePassword)
    
    // define a function to dispatch the REGSITERUSERS request
    const handleUpdatePassword = async () => {
    
        setError(errors)
    
        if (isSubmitting) return; // Don't submit the form if it's already submitting
    
        if (!isSubmitting & canUpdate) {
            setIsSubmitting(true); // Disable the signup button
            console.log(updatePassword)
            // await dispatch(REGISTERUSERS(newUser))
            // .then((response) => {
            //     if (response.payload.message) {
            //         setTimeout(() => {
            //             handleOpenModal()
            //         }, 2500)
            //         setNewUser({
            //             userRole: '',
            //             username: '',
            //             email: '',
            //             password: ''
            //         })
            //     }
            // })
            // .catch((err) => {
            //     toast.error('Something went wrong', {
            //         toastStyle: { background: 'red', color: 'white' }
            //     })
            // })
            // .finally(() => {
            //     setIsSubmitting(false); // Re-enable the signup button on error
            // })
            setIsSubmitting(false); // Re-enable the signup button on error
        }
    }
    
    
    useEffect(() => {
        handleCanUpdate(updatePassword)
    }, [updatePassword])
    
        return {updatePassword, error, handleChange, showPassword, handleShowPassword, handleUpdatePassword}
}

export default UseChangePassword