import React from 'react'
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { UPDATEPASSWORD } from '../../../Services/userApi';
import UseValidateChangePassword from './UseValidateChangePassword';
import UseLogout from '../../../Hooks/Auth/Logout/UseLogout'

const UseChangePassword = () => {

    const passwordRegexUpperCase = /^(?=.*[A-Z])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
    const passwordRegexNumber = /^(?=.*[0-9])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
    const passwordRegexSymbol = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
    
    const dispatch = useDispatch()
    const {handleLogoutforPassword} = UseLogout()
    const id = useSelector((state) => state.auth?.user?.userID)
    const status = useSelector((state) => state.auth?.status)
    
    // define state to manage form object data
    const [updatePassword, setUpdatepassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    
    const [error, setError] = useState({})
    
    // define a state to handle show password
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
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
    const handleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword)
    }
    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }
    
    // import and use useValidateChange password hook to catch errors on the form object ;
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
    
    // define a function to update user password
    const handleUpdatePassword = async () => {
    
        setError(errors)
    
        if (isSubmitting) return; // Don't submit the form if it's already submitting
    
        if (!isSubmitting & canUpdate) {
            setIsSubmitting(true); // Disable the button
            await dispatch(UPDATEPASSWORD({id, updatePassword}))
            .then((response) => {
                if (response.payload.message) {
                    setUpdatepassword({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    })
                    setTimeout(() => {
                        handleLogoutforPassword()
                    }, 3000)
                }
            })
            .catch((err) => {
                toast.error('Something went wrong', {
                    toastStyle: { background: 'red', color: 'white' }
                })
            })
            .finally(() => {
                setIsSubmitting(false); // Re-enable the button on error
            })
        }
    }
    
    
    useEffect(() => {
        handleCanUpdate(updatePassword)
    }, [updatePassword])
    
        return {status, updatePassword, error, handleChange, showCurrentPassword,  showNewPassword, showConfirmPassword, handleShowCurrentPassword, handleShowNewPassword, handleShowConfirmPassword, handleUpdatePassword}
}

export default UseChangePassword