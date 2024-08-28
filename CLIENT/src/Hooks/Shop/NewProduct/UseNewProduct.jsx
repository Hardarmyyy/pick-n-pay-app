import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UseValidateProductForm from './UseValidateProductForm'
import { UPLOADPRODUCT } from '../../../Services/productAPi'
import {toast} from 'react-toastify'

const UseNewProduct = () => {


const dispatch = useDispatch()
const userId = useSelector((state) => state?.user?.user?.userId)
const categories = useSelector((state) => state.category?.allCategories)
const productStatus = useSelector((state) => state.product?.status) 


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
        name === 'price' 
            ? formattedValue
                : name === 'countInStock' 
                    ? value.replace(/[^0-9]/g, '')
                        : name === 'brand'
                            ? value.replace(/\s/g, "")
                                : value
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

  return { newProduct, handleChange, error, handleUploadNewProduct, categories, productStatus}
}

export default UseNewProduct