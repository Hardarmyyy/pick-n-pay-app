import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import UseValidateSignupForm from './UseValidateSignupForm'
import { REGISTERUSERS } from '../Services/authApi'
import {toast} from 'react-toastify'


const UseSignup = () => {

const dispatch = useDispatch()

// define state to manage form object data
const [newUser, setNewUser] = useState({
    userRole: '',
    username: '',
    email: '',
    password: ''
})

const [error, setError] = useState({})
const [invalid, setInvalid] = useState({})

// define a state to open Modal
const [openModal, setOpenModal] = useState(false)

// define a state to handle show password
const [showPassword, setShowPassword] = useState(false)

const [isSubmitting, setIsSubmitting] = useState(false);

// define a function to handle form input state
const handleChange = (e) => {
    const {name, value} = e.target;

    setNewUser((newUser) => {return {...newUser, [name]: name === 'userRole' ? value : value.replace(/\s/g, "")}})
    // validating form state;
    if (name === 'userRole') {
        setError((error) => {return {...error, userRole: value ? '': 'Kindly choose a user profile' }})
    }
    else if (name === 'username') {
        setError((error) => {return {...error, username: value ? '': 'Kindly enter username' }})
        setInvalid((invalid) => {return {...invalid, username: value ? false : true}})
    }
    else if (name === 'email') {
        setError((error) => {return {...error, email: value ? '': 'Kindly enter email address' }})
        setInvalid((invalid) => {return {...invalid, email: value ? false : true}})
    }
    else if (name === 'password') {
        setError((error) => {return {...error, password: value ? '': 'Kindly enter password' }})
        setInvalid((invalid) => {return {...invalid, password: value ? false : true}})
    }

}

// define a function to open modal 
const handleOpenModal = () => { 
    setOpenModal(true);
}

// define a function to handle show password;
const handleShowPassword = () => {
    setShowPassword(!showPassword)
}

// import and use validatesignup hook to catch errors on the form object ;
const {errors, invalids} = UseValidateSignupForm(newUser)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegexUpperCase = /^(?=.*[A-Z])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
const passwordRegexNumber = /^(?=.*[0-9])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
const passwordRegexSymbol = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;

const handleCanSave = (value) => {
    const canSave = [
        value.userRole &&
        value.username.length >= 8 &&
        emailRegex.test(value.email) &&
        value.password.length >= 8 && 
        passwordRegexUpperCase.test(value.password) && 
        passwordRegexNumber.test(value.password) && 
        passwordRegexSymbol.test(value.password)
    ].every(Boolean)

    return canSave
}

const isSave = handleCanSave(newUser)

// define a function to dispatch the REGSITERUSERS request
const handleSignup = async () => {

    setError(errors)
    setInvalid(invalids)

    if (isSubmitting) return; // Don't submit the form if it's already submitting

    if (!isSubmitting & isSave) {
        setIsSubmitting(true); // Disable the signup button
        await dispatch(REGISTERUSERS(newUser))
        .then((response) => {
            if (response.payload.success) {
                setTimeout(() => {
                    handleOpenModal()
                }, 5000)
                setNewUser({
                    userRole: '',
                    username: '',
                    email: '',
                    password: ''
                })
            }
        })
        .catch((err) => {
            toast.error('Something went wrong', {
                toastStyle: { background: 'red', color: 'white' }
            })
        })
        .finally(() => {
            setIsSubmitting(false); // Re-enable the signup button on error
        })
    }
}


useEffect(() => {
    handleCanSave(newUser)
}, [newUser])

    return {newUser, error, invalid, handleChange, openModal, showPassword, handleShowPassword, handleSignup}
}

export default UseSignup