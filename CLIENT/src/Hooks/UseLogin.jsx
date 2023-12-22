import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { LOGIN } from '../Services/authApi'


const UseLogin = (regUser) => {  

const dispatch = useDispatch();
const navigate = useNavigate();

// define a state to handle toast 
const [toast, setToast] = useState({
    success: false,
    error: false
})

// define a state to handle show password
const [showPassword, setShowPassword] = useState(false)

// define a function to handle show password;
const handleShowPassword = () => {
    setShowPassword(!showPassword)
}

const [isSubmitting, setIsSubmitting] = useState(false);

// define a variable to check that all fields in the form object are not empty
const canLogin = [regUser.username && regUser.password].every(Boolean)

const handleLogin = async () => {

    if (isSubmitting) {
        return; // Don't submit the form if it's already submitting
    }

    setIsSubmitting(true); // Disable the login button

    await dispatch(LOGIN(regUser))
    .then((response) => {
        if (response.payload.success) {
            const token = response.payload.token
            setToast({
                success: true,
                error: false
            }) 
            setTimeout(() => {
                setToast({
                    success: false,
                    error: false
                }) 
            }, 2500)
            setTimeout(() => {
                navigate(`/otp-verification?verify=${token}`)
            }, 4000)
        }
        else if (response.payload.error) {
            setToast({
                success: false,
                error: true
            }) 
            setTimeout(() => {
                setToast({
                    success: false,
                    error: false
                }) 
            }, 2500)
            setIsSubmitting(false); // Re-enable the login button on error
        }
    })
    .catch((err) => {
        console.log('failed to login user', err)
        setIsSubmitting(false); // Re-enable the login button on error
    })
}

return {showPassword, handleShowPassword, handleLogin, toast, canLogin}

}

export default UseLogin