import React from 'react'
import UseNewProduct from '../../../Hooks/Shop/NewProduct/UseNewProduct'
import ProductForm from './ProductForm.jsx/ProductForm'

const NewProduct = () => {

const {newProduct, handleChange, error, handleUploadNewProduct} = UseNewProduct()

const handleFormSubmit = async (e) => {
    e.preventDefault()
    await handleUploadNewProduct()
}

  return (
    <>

    <section className='w-3/4 px-10 py-6 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto translate-y-0'>

        <ProductForm
            newProduct={newProduct}
            handleChange={handleChange}
            error={error}
            handleFormSubmit={handleFormSubmit}
        ></ProductForm>

    </section>

    </>
  )
}

export default NewProduct