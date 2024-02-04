import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UPDATEADDRESS } from '../../Services/addressApi'
import UseValidateUpdateShipping from './UseValidateUpdateShipping'

const UseUpdateShipping = (id) => {


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const navigate = useNavigate()
const dispatch = useDispatch()

const username = useSelector((state) => state.auth?.user?.userName)
const listOfAddresses = useSelector((state) => state.address?.shippingAddress)
const currentAddress = listOfAddresses.find(address => address._id === id)
const firstName = currentAddress?.fullName.split(' ')[0]
const lastName = currentAddress?.fullName.split(' ')[1]


//define a state to handle the customer delivery information form;
const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: firstName,
    lastName: lastName,
    email: currentAddress?.email,
    phoneNumber: currentAddress?.phoneNumber,
    streetAddress: currentAddress?.streetAddress,
    city: currentAddress?.city,
    state: currentAddress?.state,
    zipcode: currentAddress?.zipcode
})

//define a state to handle error on input change validation
const [error, setError] = useState({})

const [isSubmitting, setIsSubmitting] = useState(false)

//define a function to handle deliveryinfo form change and validation
const handleChange = (e) => {
    const {name, value} = e.target

    setDeliveryInfo((deliveryInfo) => {return {...deliveryInfo, [name]: 
        name === 'streetAddress' ? value 
            : name === 'phoneNumber' ? value.replace(/[^0-9]/g, '')
                : name === 'zipcode' ? value.replace(/[^0-9]/g, '')
                    : value.replace(/\s/g, "")
    }})

    if (name === 'firstName') {
        setError((error) => { return {...error, firstName: value ? '' : 'Enter your first name'}})
    }
    else if (name === 'lastName') {
        setError((error) => { return {...error, lastName: value ? '' : 'Enter your last name'}})
    }
    else if (name === 'email') {
        setError((error) => { return {...error, email: value ? emailRegex.test(value) ? '' : 'Invalid email address' : 'Enter email address'}})
    }
    else if (name === 'phoneNumber') {
        setError((error) => { return {...error, phoneNumber: value ? '' : 'Enter phone number'}})
    }
    else if (name === 'streetAddress') {
        setError((error) => { return {...error, streetAddress: value ? '' : 'Enter street address'}})
    }
    else if (name === 'city') {
        setError((error) => { return {...error, city: value ? '' : 'Enter your city'}})
    }
    else if (name === 'state') {
        setError((error) => { return {...error, state: value ? '' : 'Enter your state'}})
    }
}

//import UseValidateDeliveryInformation hooks to catch errors when submitting form
const {errors} = UseValidateUpdateShipping(deliveryInfo)

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
const handleSubmitDeliveryInformation = async () => {

    setError(errors)

    if (isSubmitting) return 

    if (!isSubmitting && saveInformation) {

        setIsSubmitting(true); // Disable the button
        await dispatch(UPDATEADDRESS({id, username, deliveryInfo}))
        .then((response) => {
                const {success} = response.payload
                if (success) {
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
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            setIsSubmitting(false); // Re-enable the button on error
        })
    }
}

useEffect(() => {
    handleCanSave(deliveryInfo)
}, [deliveryInfo])  

    return {currentAddress, deliveryInfo, handleChange, error, handleSubmitDeliveryInformation}

}

export default UseUpdateShipping