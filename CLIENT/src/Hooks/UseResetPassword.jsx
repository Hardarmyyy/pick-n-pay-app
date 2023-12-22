import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RESETPASSWORD, VERIFYRESETTOKEN } from '../Services/authApi'
import UseValidateResetPasswordForm from './UseValidateResetPasswordForm'
import {toast} from 'react-toastify'


const UseResetPassword = (email, token) => {

const dispatch = useDispatch()

const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
}) 

const [error, setError] = useState({})
const [invalid, setInvalid] = useState({})

const [isSubmitting, setIsSubmitting] = useState(false);

const [openModal, setOpenModal] = useState(false)

// define a state to handle show password
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)


const handleChange = (e) => {
    const {name, value} = e.target;
    setUser((user) => {return {...user, [name]: value.replace(/\s/g, "")}})
    // validating form state;
    if (name === 'password') {
        setError((error) => {return {...error, password: value ? '': 'Kindly enter password' }})
        setInvalid((invalid) => {return {...invalid, password: value ? false : true}})
    }
    if (name === 'confirmPassword') {
        setError((error) => {return {...error, confirmPassword: value ? '': 'Kindly confirm password' }})
        setInvalid((invalid) => {return {...invalid, confirmPassword: value ? false : true}})
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
const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
}

const {errors, invalids} = UseValidateResetPasswordForm(user) //import UseValidateResetPasswordForm hook to catch errors on the form object 

const passwordRegexUpperCase = /^(?=.*[A-Z])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
const passwordRegexNumber = /^(?=.*[0-9])[a-zA-Z0-9.!@#$%^&*]{8,}$/;
const passwordRegexSymbol = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;

const canSubmit = (value) => {
    const isSave = [
        value.password, 
        value.confirmPassword,
        passwordRegexUpperCase.test(value.password),
        passwordRegexNumber.test(value.password),
        passwordRegexSymbol.test(value.password)
    ].every(Boolean) 
    return isSave
}

const submitEmail = canSubmit(user)

const handleResetPassword = async () => {

    setError(errors)
    setInvalid(invalids)

    if (isSubmitting) return; 
    
    if(submitEmail && !isSubmitting) {
        setIsSubmitting(true); // Disable the button
        
        await  dispatch(RESETPASSWORD({user, token}))
        .then((response) => {
            if (response.payload.success) {
                setTimeout(() => {
                    handleOpenModal()
                }, 5000)
                setUser({
                    password: '',
                    confirmPassword: '',
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

const handleVerifyResetToken = () => {
    dispatch(VERIFYRESETTOKEN({token, email})) 
}

useEffect(() => {
    canSubmit(user)
}, [user])

return {user, error, invalid, handleChange, handleVerifyResetToken, handleResetPassword, openModal, showPassword, handleShowPassword, showConfirmPassword, handleShowConfirmPassword}
}

export default UseResetPassword




