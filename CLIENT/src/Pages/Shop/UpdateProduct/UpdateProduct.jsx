import React from 'react'
import { useParams } from 'react-router-dom'
import UseUpdateProduct from '../../../Hooks/Shop/UpdateProduct/UseUpdateProduct';
import ProductForm from '../NewProduct/ProductForm.jsx/ProductForm'

const UpdateProduct = () => {

const {id} = useParams()
const {currentProduct, editProduct, error, handleChange, handleUpdateProduct} = UseUpdateProduct(id)


const handleSubmitUpdateProduct = async (e) => {
    e.preventDefault()
    await handleUpdateProduct()
}

  return (
    <>
        <section className='w-3/4 px-10 py-6 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto translate-y-0'>

            {currentProduct  
                ?
                    <ProductForm
                        newProduct={editProduct}
                        handleChange={handleChange}
                        error={error}
                        handleFormSubmit={handleSubmitUpdateProduct}
                    >
                    </ProductForm>
                    :

                        <p className='text-center mt-4 text-lg'> The product does not exist </p>}

        </section>
    </>
  )
}

export default UpdateProduct