import { useState, useRef, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { VERIFYEMAIL, VERIFYEMAILTOKEN } from '../../../Services/authApi'
import UseValidateVerifyEmailForm from './UseValidateVerifyEmailForm'
import {toast} from 'react-toastify'


const UseVerifyEmail = (token, email) => {

const dispatch = useDispatch()

const [signupOtp, setSignupOtp] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
}); 

const [invalid, setInvalid] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
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

    // Update the invalid state based on whether there is any input value
    setInvalid((invalid) => {return {...invalid, [name]: value ? false : true}});

    setError("")
    
    if (value.replace(/[^0-9]/g, '') && inputRefs[name].current) {
        const nextField = getNextField(name);
        if (nextField) {
            inputRefs[nextField].current.focus();
        }
    }
}

// define a function to open modal 
const hanldeOpenModal = () => { 
    setOpenModal(true);
} 

const handleCanSubmitOTP = (value) => {
    const submitOTP = Object.values(value).every(Boolean);
    return submitOTP
}

const submitOTP = handleCanSubmitOTP(signupOtp)

// define a function to send request to backend API
const handleVerifyEmail = async () => {

    if (!isOTPComplete) {
        // Set invalid for each empty field to true
        setInvalid((invalid) => {
            const updatedInvalid = { ...invalid };
            Object.keys(updatedInvalid).forEach((fieldName) => {
                if (!signupOtp[fieldName]) {
                    updatedInvalid[fieldName] = true;
                }
            });
            return updatedInvalid;
        });

        setError("Incomplete OTP. Please enter a 6-digit OTP.")

        return;
    }
    
    if (isSubmitting) return;

    if (!isSubmitting && submitOTP)  {
        setIsSubmitting(true); // Disable the confirm otp button

        await dispatch(VERIFYEMAIL({token, Otp})) // pass the signupOtp as the request body and the email as the request query parameter
        .then((response) => {
            if (response.payload.success) {
                setTimeout(() => {
                    hanldeOpenModal()
                }, 5000)
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


    return {signupOtp, invalid, error, handleChange, inputRefs, openModal, handleBackspace, handleVerifyEmail, handleVerifyEmailToken}

}

export default UseVerifyEmail