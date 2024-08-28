import React from 'react'
import { useParams } from 'react-router-dom'
import UseUpdateProduct from '../../../Hooks/Shop/UpdateProduct/UseUpdateProduct';
import ProductForm from '../../../component/ProductForm.jsx/ProductForm' 
import { Link } from 'react-router-dom';
import UseFetchStore from '../../../Hooks/Shop/UseFetchStore';
import Spinner from '../../../component/Spinner';

const UpdateProduct = () => {

const {id} = useParams()
const {shopStatus} = UseFetchStore()
const {currentProduct, editProduct, error, handleChange, handleUpdateProduct, categories, productStatus, loading} = UseUpdateProduct(id) 

const handleSubmitUpdateProduct = async (e) => {
    e.preventDefault()
    await handleUpdateProduct()
} 

  return (
    <>
        <section className='w-full tablet:w-3/4 mini:w-4/5 min-h-[70vh] laptop:w-4/5 super:w-4/5 mx-auto flex flex-col justify-center items-center'>

            {shopStatus === 'Loading...' && <Spinner></Spinner>} 

            {currentProduct  && shopStatus !== 'Loading...' &&
    
                    <ProductForm
                        newProduct={editProduct}
                        handleChange={handleChange}
                        error={error}
                        handleFormSubmit={handleSubmitUpdateProduct}
                        categories={categories}
                        status={productStatus}
                    >
                    </ProductForm>
            }

            {!currentProduct  && shopStatus !== 'Loading...' && !loading &&

                <div className='flex flex-col justify-center items-center'>
                    <p className='font-Jost md:text-2xl lg:text-4xl mb-2'> The product does not exist </p>
                    <p className='sm:text-sm md:text-sm tablet:text-lg mini:text-lg laptop:text-lg super:text-xl'> Click <Link to={'/shop/all-products'} className='text-blue-800 hover:underline font-bold'> here </Link> to see all products in the shop </p>
                </div>
            }

        </section>
    </>
  )
}

export default UpdateProduct