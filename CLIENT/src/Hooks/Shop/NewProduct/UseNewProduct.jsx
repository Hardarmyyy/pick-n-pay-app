import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UseValidateProductForm from './UseValidateProductForm'
import { UPLOADPRODUCT } from '../../../Services/productAPi'
import {toast} from 'react-toastify'

const UseNewProduct = () => {


const navigate = useNavigate()
const dispatch = useDispatch()
const userId = useSelector((state) => state.auth?.user?.userID)

//define a state to handle the product information form;
const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    countInStock: ''
})

//define a state to handle error on input change validation
const [error, setError] = useState({})

const [isSubmitting, setIsSubmitting] = useState(false)

//define a function to handle product form change and validation
const handleChange = (e) => {
    const {name, value} = e.target

    // Format price value to allow two decimal places
    let formattedValue = value.replace(/[^\d.]/g, '');
    const parts = formattedValue.split('.');
    if (parts.length > 1) {
        // If there are decimal parts, keep only two decimal places
        formattedValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }


    setNewProduct((newProduct) => {return {...newProduct, [name]: 
        name === 'title' 
            ? value 
                : name === 'description' 
                    ? value
                        : name === 'category' 
                            ? value
                            : name === 'price' 
                                ? formattedValue
                                    : name === 'countInStock' 
                                        ? value.replace(/[^0-9]/g, '')
                                            : value.replace(/\s/g, "")
    }})

    if (name === 'title') {
        setError((error) => { return {...error, title: value ? value.length >= 100 ? 'Maximum number of characters is 100' : null : 'Kindly enter product title'}})
    }
    else if (name === 'price') {
        setError((error) => { return {...error, price: value ? Number(value) <= 0 ? 'Minimum price must be greater than 0' : null : 'Kindly enter product price'}})
    }
    else if (name === 'description') {
        setError((error) => { return {...error, description: value ? value.length >= 400 ? 'Maximum number of characters is 400' : null  : 'Kindly enter product description'}})
    }
    else if (name === 'category') {
        setError((error) => { return {...error, category: value ? '' : 'Kindly select a category'}})
    }
    else if (name === 'brand') {
        setError((error) => { return {...error, brand: value ? '' : null}})
    }
    else if (name === 'countInStock') {
        setError((error) => { return {...error, countInStock: value ? Number(value) < 1 ? 'Minimum quantity is 1' : null : 'Minimum quantity is required'}})
    }
}

//import useValidateProductForm hooks to catch errors when submitting form
const {errors} = UseValidateProductForm(newProduct)

const handleCanUpload = (value) => {
    const canUpload = [
        value.title &&
        value.price && 
        Number(value.price) > 0 &&
        value.description &&
        value.category &&
        value.countInStock &&
        Number(value.countInStock) >= 1 
    ].every(Boolean) // enable the submit button 

    return canUpload
}

const uploadProduct = handleCanUpload(newProduct)

//define a function to upload new product
const handleUploadNewProduct = async () => {

    if (isSubmitting) return 

    setError(errors)

    if (!isSubmitting && uploadProduct) {
        setIsSubmitting(true); // Disable the button
        await dispatch(UPLOADPRODUCT({userId, newProduct}))
        .then((response) => {
            const {success, newProduct} = response.payload
            if (success) {
                setNewProduct({
                    title: '',
                    price: '',
                    description: '',
                    category: '',
                    brand: '',
                    countInStock: ''
                })
                setTimeout(() => {
                    navigate(`/shop/product-success/${newProduct._id}`)
                }, 500)
            }
        })
        .catch((err) => {
            toast.error('Something went wrong', {
                toastStyle: { background: 'red', color: 'white' }
            })
        })
        .finally(() => {
            setIsSubmitting(false); // Re-enable the button on error
        })
    }
}

useEffect(() => {
    handleCanUpload(newProduct)
}, [newProduct])  

  return { newProduct, handleChange, error, handleUploadNewProduct}
}

export default UseNewProduct