import React from 'react'
import UseNewProduct from '../../../Hooks/Shop/NewProduct/UseNewProduct'
import ProductForm from '../../../component/ProductForm.jsx/ProductForm'

const NewProduct = () => {

const {newProduct, handleChange, error, handleUploadNewProduct, categories, productStatus} = UseNewProduct();

const handleFormSubmit = async (e) => {
    e.preventDefault()
    await handleUploadNewProduct()
}

  return (
    <>

    <section className='w-full tablet:w-3/4 mini:w-4/5 laptop:w-4/5 super:w-4/5 mx-auto flex justify-center items-start'>

        <ProductForm
            newProduct={newProduct}
            handleChange={handleChange}
            error={error}
            handleFormSubmit={handleFormSubmit}
            categories={categories}
            status={productStatus}
        ></ProductForm>

    </section>

    </>
  )
}

export default NewProduct