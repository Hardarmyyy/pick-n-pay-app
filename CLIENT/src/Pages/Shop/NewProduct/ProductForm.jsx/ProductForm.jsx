import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Button from '../../../../component/Button'

const ProductForm = ({newProduct, handleChange, error, handleFormSubmit}) => {

const location = useLocation();
const showUploadButton = location.pathname === '/shop/add-new-product'

const categories = useSelector((state) => state.category?.allCategories)
const status = useSelector((state) => state.product?.status)

  return (

    <>
        <form className='w-full text-my-primary font-Montserrat' onSubmit={handleFormSubmit}>

            <div className='mb-4 relative'>
                <label className='font-bold'> Product Title <span className='text-crimson'> * </span></label> <br />
                <input 
                    type='text' 
                    className='w-full px-2 py-1 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                    value={newProduct?.title} 
                    onChange={handleChange} 
                    placeholder='Product title' 
                    name='title' 
                    maxLength={100}
                />
                {error && <p className='text-crimson text-sm absolute left-0'> {error.title} </p>}
            </div>
                
            <div className='mb-4 relative'>
                <label className='font-bold'> Price <span className='text-crimson'> * </span></label>
                <input 
                    type='text' 
                    className='w-full px-2 py-1 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                    value={newProduct?.price} 
                    onChange={handleChange} 
                    placeholder='Product price' 
                    name='price'
                />
                {error && <p className='text-crimson text-sm absolute left-0'> {error.price} </p>}
            </div>

            <div className='mb-4 relative'>
                <label className='font-bold'> Description <span className='text-crimson'> * </span></label> <br />
                <textarea 
                    className='w-full p-2 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                    value={newProduct?.description} 
                    onChange={handleChange} 
                    placeholder='Product description' 
                    name='description' 
                    minLength={1} 
                    maxLength={400} 
                    rows={6} 
                    cols={105}>
                </textarea>
                {error && <p className='text-crimson text-sm absolute left-0 -bottom-4'> {error.description} </p>}
            </div>

            <div className='mb-4 relative'>
                <label className='font-bold'> Select category <span className='text-crimson'> * </span> </label>  <br />
                <select 
                    className='w-full px-2 py-1 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                    value = {newProduct?.category} 
                    onChange={handleChange} 
                    name='category'
                >

                    <option defaultValue={"choose category"}> Choose category </option>
                    {categories.map((category) => (
                        <option value={category?.category} key={category?.categoryID}> {category?.category} </option>
                    ))}
                    
                </select>
                {error && <p className='text-crimson text-sm absolute left-0'> {error.category} </p>}
            </div>

            <div className='mb-4 relative'>
                <label className='font-bold'> Brand </label> <br />
                <input 
                    type='text' 
                    className='w-full px-2 py-1 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                    value={newProduct?.brand} 
                    onChange={handleChange} 
                    placeholder='product brand' 
                    name='brand'
                />
                {error && <p className='text-crimson text-sm absolute left-0'> {error.brand} </p>}
            </div>

            <div className='mb-4 relative'>
                <label className='font-bold'> Quantity <span className='text-crimson'> * </span></label> <br />
                <input 
                    type='text'
                    className='w-full px-2 py-1 border-2 rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-950'
                    value={newProduct?.countInStock} 
                    onChange={handleChange} 
                    placeholder='Quantity in stock' 
                    name='countInStock' 
                />
                {error && <p className='text-crimson text-sm absolute left-0'> {error.countInStock} </p>}
            </div>

            <div className='text-center'>
                {showUploadButton ? 
                    <Button margin='20px 0px' padding='10px 70px'> {status === 'Loading.......' ? <span> Uploading .... </span> : <span> Upload product </span>} </Button>
                        : <Button margin='20px 0px' padding='10px 70px'> {status === 'Loading.......' ? <span> Updating .... </span> : <span> Save changes </span>} </Button> }
            </div>

        </form>
    </>
  )
}

export default ProductForm