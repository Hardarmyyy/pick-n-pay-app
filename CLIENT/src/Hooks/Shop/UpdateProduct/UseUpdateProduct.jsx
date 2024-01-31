import React from 'react'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { UPDATEPRODUCT } from '../../../Services/productAPi';
import UseValidateUpdateProduct from '../UpdateProduct/UseValidateUpdateProduct';


const UseUpdateProduct = (id) => {

const dispatch = useDispatch()
const navigate = useNavigate()
const username = useSelector((state) => state.auth?.user?.userName)
const storeProducts = useSelector((state) => state.product?.store)
const currentProduct = storeProducts.find((product) => product?.productId === id)

//define a state to handle the product information form;
const [editProduct, setEditProduct] = useState({
  title: currentProduct?.title,
  price: currentProduct?.price,
  description: currentProduct?.description,
  category: currentProduct?.category,
  brand: currentProduct?.brand,
  countInStock: currentProduct?.countInStock
})

//define a state to handle error on input change validation
const [error, setError] = useState({})

const [isSubmitting, setIsSubmitting] = useState(false)

//define a function to handle product form change and validation
const handleChange = (e) => {
  const {name, value} = e.target

  setEditProduct((editProduct) => {return {...editProduct, [name]: 
      name === 'title' 
          ? value 
              : name === 'description' 
                  ? value
                    : name === 'category' 
                        ? value
                            : name === 'price' 
                                ? value.replace(/[^0-9]/g, '')
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
      setError((error) => { return {...error, countInStock: value ? Number(value) < 1 ? 'Minimum quantity is 1' : null : 'Kindly enter quantity in stock'}})
  }
}

//import UseValidateUpdateProduct hooks to catch errors when submitting form
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

//define a function to upload new product
const handleUpdateProduct = async () => {

  if (isSubmitting) return 

  setError(errors)

  if (!isSubmitting && uploadProduct) {
      setIsSubmitting(true); // Disable the button
      await dispatch(UPDATEPRODUCT({id, username, editProduct}))
      .then((response) => {
            const {success, updatedProduct} = response.payload
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
                    navigate(`/shop/product-success/${updatedProduct._id}`)
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

return {currentProduct, editProduct, error, handleChange, handleUpdateProduct }


}

export default UseUpdateProduct