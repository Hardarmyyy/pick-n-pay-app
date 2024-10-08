import React from 'react'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { UPDATEPRODUCT, SINGLEPRODUCT } from '../../../Services/productAPi';
import UseValidateUpdateProduct from '../UpdateProduct/UseValidateUpdateProduct';


const UseUpdateProduct = (id) => {

const dispatch = useDispatch()
const navigate = useNavigate()

const currentProduct = useSelector((state) => state?.product?.selectedProduct);
const categories = useSelector((state) => state.category?.allCategories)
const productStatus = useSelector((state) => state.product?.status) 
const username = useSelector((state) => state?.user?.user?.username)


const [editProduct, setEditProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    countInStock: ''
})

// define a state to handle error on input change validation
const [error, setError] = useState({})
const [loading, setLoading] = useState(true)
const [isSubmitting, setIsSubmitting] = useState(false)

// define a function to handle product form change and validation
const handleChange = (e) => {
    const {name, value} = e.target

    // Format price value to allow two decimal places
    let formattedValue = value.replace(/[^\d.]/g, '');
    const parts = formattedValue.split('.');
    if (parts.length > 1) {
        // If there are decimal parts, keep only two decimal places
        formattedValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    setEditProduct((editProduct) => {return {...editProduct, [name]: 
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
        setError((error) => { return {...error, countInStock: value ? Number(value) < 1 ? 'Minimum quantity is 1' : null : 'Kindly enter quantity in stock'}})
    }
}

// import UseValidateUpdateProduct hooks to catch errors when submitting form
const {errors} = UseValidateUpdateProduct(editProduct)

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

const uploadProduct = handleCanUpload(editProduct)

// define a function to upload new product
const handleUpdateProduct = async () => {

    if (isSubmitting) return 

    setError(errors)

    if (!isSubmitting && uploadProduct) {
        setIsSubmitting(true); // Disable the button
        await dispatch(UPDATEPRODUCT({id, username, editProduct}))
        .then((response) => {
            const {success} = response.payload
            if (success) {
                setEditProduct({
                    title: '',
                    price: '',
                    description: '',
                    category: '',
                    brand: '',
                    countInStock: ''
                })
                setTimeout(() => {
                    navigate(`/shop/all-products`)
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
    handleCanUpload(editProduct)
}, [editProduct])  


// Use useEffect to set the editProduct state with current product information when the component mounts or current product changes
useEffect(() => {
    if (!currentProduct || currentProduct.productId !== id) {
        dispatch(SINGLEPRODUCT({id, username}))
    }
    else {
        setEditProduct({
            title: currentProduct?.title || '',
            price: currentProduct?.price || '',
            description: currentProduct?.description || '',
            category: currentProduct?.category || '',
            brand: currentProduct?.brand || '',
            countInStock: currentProduct?.countInStock || ''
        });
    }
    return () => {
        setLoading(false);
    }
}, [currentProduct, id, dispatch]);

return {currentProduct, editProduct, error, handleChange, handleUpdateProduct, categories, productStatus, loading }


}

export default UseUpdateProduct