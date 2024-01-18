import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UseValidateUpdateProfile from './UseValidateUpdateProfile';

const UseUpdateProfile = () => {

const dispatch = useDispatch(); 
const navigate = useNavigate();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const currentUser = useSelector((state) => state.user?.currentUser)


const [updateProfile, setUpdateProfile] = useState({
    username: currentUser?.username,
    email: currentUser?.email
})

const [error, setError] = useState({})

// define a function to handle form state
const handleChange = (e) => {
    const {name, value} = e.target;
    setUpdateProfile((updateProfile) => {return {...updateProfile, [name]: value.replace(/\s/g, "")}})
    // validating form state;
    if (name === 'username') {
        setError((error) => {return {...error, username: value ? '': 'Kindly enter username' }})
    }
    if (name === 'email') {
        setError((error) => { return {...error, email: value ? emailRegex.test(value) ? '' : 'Enter a valid email address' : 'Enter email address'}})
    }
} 

const [isSubmitting, setIsSubmitting] = useState(false);

// import and use validateLoginForm hook to catch errors on the form object;
const {errors} = UseValidateUpdateProfile(updateProfile)

// define a function to check that all fields in the form object are not empty
const handleCanUpdateProfile = (value) => {
    const canUpdate = [
        value.username && 
        value.email
    ].every(Boolean)

    return canUpdate
}

const isSave = handleCanUpdateProfile(updateProfile)

// define a function to dispatch the LOGIN request
const handleUpdateProfile = async () => {

    setError(errors)

    if (isSubmitting) return; // Don't submit the form if it's already submitting

    if(!isSubmitting && isSave) {
        setIsSubmitting(true); 
        console.log(updateProfile)
        // await await dispatch(LOGIN(regUser))
        // .then((response) => {
        //     if (response.payload.message) {
        //         setTimeout(() => {
        //             navigate(from, {replace : true});
        //         }, 2500)
        //         setRegUser({
        //             username: '',
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
    handleCanUpdateProfile(updateProfile)
}, [updateProfile])


return {updateProfile, error, handleChange,  handleUpdateProfile}
}

export default UseUpdateProfile