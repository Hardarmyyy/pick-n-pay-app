import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import UseValidateDeliveryInformation from './UseValidateDeliveryInformation'

const UseDeliveryInformation = () => {


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const navigate = useNavigate()

const cart = useSelector((state) => state.cart.cartItems)

//define a state to handle the customer delivery information form;
const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    isShipping: false
})

//define a state to handle error on input change validation
const [error, setError] = useState({})

const [isSubmitting, setIssubmitting] = useState(false)

//define a function to handle deliveryinfo form change and validation
const handleChange = (e) => {
    const {name, value} = e.target

    setDeliveryInfo((deliveryInfo) => {return {...deliveryInfo, [name]: 
        name === 'streetAddress' ? value 
            : name === 'phoneNumber' ? value.replace(/[^0-9]/g, '')
                : name === 'zipcode' ? value.replace(/[^0-9]/g, '')
                    : name === 'isShipping' ? !deliveryInfo.isShipping
                        : value.replace(/\s/g, "")
    }})

    if (name === 'firstName') {
        setError((error) => { return {...error, firstName: value ? '' : 'Kindly enter your first name'}})
    }
    else if (name === 'lastName') {
        setError((error) => { return {...error, lastName: value ? '' : 'Kindly enter your last name'}})
    }
    else if (name === 'email') {
        setError((error) => { return {...error, email: value ? emailRegex.test(value) ? '' : 'Enter a valid email address' : 'Enter email address'}})
    }
    else if (name === 'phoneNumber') {
        setError((error) => { return {...error, phoneNumber: value ? '' : 'Kindly enter your phone number'}})
    }
    else if (name === 'streetAddress') {
        setError((error) => { return {...error, streetAddress: value ? '' : 'Kindly enter street address'}})
    }
    else if (name === 'city') {
        setError((error) => { return {...error, city: value ? '' : 'Kindly enter your city'}})
    }
    else if (name === 'state') {
        setError((error) => { return {...error, state: value ? '' : 'Kindly enter your state'}})
    }
    else if (name === 'isShipping') {
        setDeliveryInfo((deliveryInfo) => {return {...deliveryInfo, firstName: '', lastName: '', email: '', phoneNumber: '', streetAddress: '', city: '', state: '', zipcode: ''}})
        setError((error) => { return {...error, firstName: value ? '' : null, lastName: value ? '': null, email: value ? '' : null, phoneNumber: value ? '' : null, streetAddress: value ? '' : null, city: value ? '' : null,  state: value ? '' : null, zipcode: value ? '' : null}})
    }
}

//import UseValidateDeliveryInformation hooks to catch errors when submitting form
const {errors} = UseValidateDeliveryInformation(deliveryInfo)

const handleCanSave = (value) => {
    const canSubmit = [
        value.firstName &&
        value.lastName &&
        value.email &&
        emailRegex.test(value.email) &&
        value.phoneNumber &&
        value.streetAddress &&
        value.city &&
        value.state
    ].every(Boolean) // enable the submit button 

    return canSubmit
}

const saveInformation = handleCanSave(deliveryInfo)

//define a function to submit delivery information form
const handleSubmitDeliveryInformation = () => {

    if (isSubmitting) return 

    if (deliveryInfo.isShipping) {

        if (!cart.length) {
            return toast.error('Kindly add products to cart', {
                        toastStyle: { background: 'red', color: 'white' }
                    })
        }
        return navigate('/checkout')
    }

    setError(errors)

    if (!isSubmitting && saveInformation) {

        if (!cart.length) {
            return toast.error('Kindly add products to cart', {
                        toastStyle: { background: 'red', color: 'white' }
                    })
        }
        
        setDeliveryInfo({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            streetAddress: '',
            city: '',
            state: '',
            zipcode: ''
        })
        setTimeout(() => {
            navigate('/checkout')
        }, 1500)
    }
    setIssubmitting(false)
}

useEffect(() => {
    handleCanSave(deliveryInfo)
}, [deliveryInfo])  

  return {deliveryInfo, handleChange, error, handleSubmitDeliveryInformation}
}

export default UseDeliveryInformation