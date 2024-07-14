import React from 'react'
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { UPDATEPASSWORD } from '../../../Services/userApi';
import UseValidateChangePassword from './UseValidateChangePassword';
import UseLogout from '../../../Hooks/Auth/Logout/UseLogout'

const UseChangePassword = () => {
    
    const dispatch = useDispatch()
    const {handlePasswordLogout} = UseLogout()
    const id = useSelector((state) => state?.user?.user?.userId)
    const status = useSelector((state) => state?.user?.status)
    
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
            setError((error) => {return {...error, currentPassword: value ? '' : 'Enter current password'}}) 
        }
        else if (name === 'newPassword') {
            setError((error) => {return {...error, newPassword: value ? value.length >= 8 ? '' : 'New password must be at least 8 characters' : 'Enter new password' }})
        }
        else if (name === 'confirmPassword') {
            const newPassword = updatePassword.newPassword
            setError((error) => { return {...error, confirmPassword: value ? 
                                                                            newPassword === value ? '' : 'Password does not match' 
                                                                                : 'Confirm new password' }})
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
            value.confirmPassword === value.newPassword
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
                        handlePasswordLogout()
                    }, 1500)
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