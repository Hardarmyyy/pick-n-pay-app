import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RESETPASSWORD, VERIFYRESETTOKEN } from '../../../Services/authApi'
import UseValidateResetPasswordForm from './UseValidateResetPasswordForm'
import {toast} from 'react-toastify'


const UseResetPassword = (email, token) => {

    const dispatch = useDispatch();
    const isValid = useSelector((state) => state?.auth.isValid)
    const status = useSelector((state) => state.auth.status)
    const verifyResetStatus = useSelector((state) => state?.auth?.status)

    const [user, setUser] = useState({
        password: '',
        confirmPassword: '',
    }) 

    const [error, setError] = useState({})

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [openModal, setOpenModal] = useState(false) 

    // define a state to handle show password
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const handleChange = (e) => {
        const {name, value} = e.target;

        setUser((user) => {return {...user, [name]: value.replace(/\s/g, "")}});
        // validating form state;
        if (name === 'password') {
            setError((error) => {return {...error, password: value ? value.length > 8 ? '' : 'Password must be at least 8 characters' : 'Kindly enter password' }})
        }
        if (name === 'confirmPassword') {
            const password = user.password
            setError((error) => {return {...error, confirmPassword: value ? 
                                                                            password === value ? '' : 'Password does not match' 
                                                                                : 'Kindly confirm password' }})
        }
    }

    // define a function to open modal 
    const handleOpenModal = () => { 
        setOpenModal(!openModal);
    } 

    // define a function to handle show password;
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const {errors} = UseValidateResetPasswordForm(user) //import UseValidateResetPasswordForm hook to catch errors on the form object 

    const canSubmit = (value) => {
        const isSave = [
            value.password && 
            value.confirmPassword  &&
            value.password.length >= 8 &&
            value.password == value.confirmPassword
        ].every(Boolean) 
        return isSave
    }

    const submitEmail = canSubmit(user)
    
    const handleResetPassword = async () => {

        setError(errors)

        if (isSubmitting) return; 
        
        if(submitEmail && !isSubmitting) {
            setIsSubmitting(true); // Disable the button
            
            await  dispatch(RESETPASSWORD({user, token}))
            .then((response) => {
                if (response.payload.message) {
                    setTimeout(() => {
                        handleOpenModal()
                    }, 2500)
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

    return {isValid, status, verifyResetStatus, user, error, handleChange, handleVerifyResetToken, handleResetPassword, openModal, handleOpenModal, showPassword, handleShowPassword, showConfirmPassword, handleShowConfirmPassword}
}

export default UseResetPassword




