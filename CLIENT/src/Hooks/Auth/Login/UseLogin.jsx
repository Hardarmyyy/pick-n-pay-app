import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'
import UseValidateLoginform from './UseValidateLoginForm'
import { LOGIN } from '../../../Services/authApi'


const UseLogin = () => {  

const dispatch = useDispatch(); 
const navigate = useNavigate();
const location = useLocation();
const from = location.state?.from?.pathname || '/'

// define state to manage form object data
const [regUser, setRegUser] = useState({
    username: '',
    password: ''
})

const [error, setError] = useState({})
const [invalid, setInvalid] = useState({})

// define a function to handle form state
const handleChange = (e) => {
    const {name, value} = e.target;
    setRegUser((regUser) => {return {...regUser, [name]: value.replace(/\s/g, "")}})
    // validating form state;
    if (name === 'username') {
        setError((error) => {return {...error, username: value ? '': 'Kindly enter username' }})
        setInvalid((invalid) => {return {...invalid, username: value ? false : true}})
    }
    if (name === 'password') {
        setError((error) => {return {...error, password: value ? '': 'Kindly enter password' }})
        setInvalid((invalid) => {return {...invalid, password: value ? false : true}})
    }
} 

// define a state to handle show password
const [showPassword, setShowPassword] = useState(false)

// define a function to handle show password;
const handleShowPassword = () => {
    setShowPassword(!showPassword)
}

const [isSubmitting, setIsSubmitting] = useState(false);

// import and use validateLoginForm hook to catch errors on the form object;
const {errors, invalids} = UseValidateLoginform(regUser)

// define a function to check that all fields in the form object are not empty
const handleCanLogin = (value) => {
    const canLogin = [
        value.username && value.password
    ].every(Boolean)

    return canLogin
}

const isLogin = handleCanLogin(regUser)


// define a function to dispatch the LOGIN request
const handleLogin = async () => {

    setError(errors)
    setInvalid(invalids)

    if (isSubmitting) return; // Don't submit the form if it's already submitting

    if(!isSubmitting && isLogin) {
        setIsSubmitting(true); 

        await await dispatch(LOGIN(regUser))
        .then((response) => {
            if (response.payload.message) {
                setTimeout(() => {
                    navigate(from, {replace : true});
                }, 2500)
                setRegUser({
                    username: '',
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
    handleCanLogin(regUser)
}, [regUser])

return {regUser, error, invalid, handleChange, showPassword, handleShowPassword, handleLogin}

}

export default UseLogin 