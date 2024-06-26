import { useState, useRef, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { VERIFYEMAIL, VERIFYEMAILTOKEN } from '../../../Services/authApi'
import UseValidateVerifyEmailForm from './UseValidateVerifyEmailForm'
import {toast} from 'react-toastify'


const UseVerifyEmail = (token, email) => {

const dispatch = useDispatch()
const isValid = useSelector((state) => state?.auth.isValid)
const isVerified = useSelector((state) => state?.auth.isVerified)
const status = useSelector((state) => state?.auth?.status)
const verifyEmailStatus = useSelector((state) => state?.auth?.status)

const [signupOtp, setSignupOtp] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
}); 


const inputRefs = {
    one: useRef(null),
    two: useRef(null),
    three: useRef(null),
    four: useRef(null),
    five: useRef(null),
    six: useRef(null),
};

const [error, setError] = useState('')

// define a state to open and close Modal
const [openModal, setOpenModal] = useState(false)

const [isSubmitting, setIsSubmitting] = useState(false);

const {getNextField, handleBackspace, Otp, isOTPComplete} = UseValidateVerifyEmailForm(signupOtp, inputRefs)

// define a function to handle form input state
const handleChange = (e) => {
    const {name, value} = e.target;

    setSignupOtp((signupOtp) => {return {...signupOtp, [name]: value.replace(/[^0-9]/g, '').slice(0, 1)}})

    setError("")
    
    if (value.replace(/[^0-9]/g, '') && inputRefs[name].current) {
        const nextField = getNextField(name);
        if (nextField) {
            inputRefs[nextField].current.focus();
        }
    }
}

// define a function to open modal 
const handleOpenModal = () => { 
    setOpenModal(!openModal);
} 

const handleCanSubmitOTP = (value) => {
    const submitOTP = Object.values(value).every(Boolean);
    return submitOTP
}

const submitOTP = handleCanSubmitOTP(signupOtp)

// define a function to send request to backend API
const handleVerifyEmail = async () => {

    if (!isOTPComplete) return setError("Invalid. Please enter a 6-digit OTP.")

    if (isSubmitting) return;

    if (!isSubmitting && submitOTP)  {
        setIsSubmitting(true); // Disable the confirm otp button

        await dispatch(VERIFYEMAIL({token, Otp})) // pass the signupOtp as the request body and the email as the request query parameter
        .then((response) => {
            if (response.payload.message) {
                setTimeout(() => {
                    handleOpenModal()
                }, 2500)
            }
        })
        .catch((err) => {
            toast.error('Something went wrong', {
                toastStyle: { background: 'red', color: 'white' }
            })
        })
        .finally(() => {
            setSignupOtp({
                one: '',
                two: '',
                three: '',
                four: '',
                five: '',
                six: '',
            })
            setIsSubmitting(false);
        })
    }
}

const handleVerifyEmailToken = () => {
    dispatch(VERIFYEMAILTOKEN({token, email})) 
}

useEffect(() => {
    handleCanSubmitOTP(signupOtp)
}, [signupOtp])


    return {isValid, isVerified, status, verifyEmailStatus, signupOtp, error, handleChange, inputRefs, openModal, handleOpenModal, handleBackspace, handleVerifyEmail, handleVerifyEmailToken}

}

export default UseVerifyEmail