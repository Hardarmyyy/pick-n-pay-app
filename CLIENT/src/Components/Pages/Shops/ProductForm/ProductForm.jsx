import React from 'react'
import '../ProductForm/ProductForm.css'
import UserProfile from '../../Navigation/UserProfileCard/UserProfile'
import { useState, useEffect} from 'react'
import Button from '../../../../Utilities/Button'
import {availableProductCategory} from '../../../../Utilities/ProductContext'
import { useContext } from 'react'
import { myUserContext } from '../../../../Utilities/UserContext'
import axios from 'axios'
import { AiFillDelete } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom'

const ProductForm =  () => { 

const navigate = useNavigate();

// define a state to manage upload photo changes
const [image, setImage] = useState(null);
const [message, setMessage] = useState(null);

// define a function to uplaod image to server
const handleUpload =  (e) => {
    e.preventDefault();
    if (!image) {
        setMessage('No file selected')
        return setTimeout(() => {setMessage(null)}, 1500)
    }
    const formdata = new FormData();
    formdata.append('image', image)
    setMessage('uploading.......')
    axios
    .post('http://localhost:4050/api/photo/upload', formdata, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
        setTimeout(() => {setMessage('upload successful')}, 1000)
        setTimeout(() => {setMessage(null)}, 1500)
        setImage(null)
    })
    .catch((error) => {
        setMessage('upload failed')
        setTimeout(() => {setMessage(null)}, 1500)
    })
}

// define a function to fetch image from server
const [allImage, setAllImage] = useState([])

const handleImageFetch =  () => {
    axios
    .get('http://localhost:4050/api/photo/fetch-image')
    .then((response) => {
        const result = response.data
        setAllImage(result?.imagesWithFileName); 
    })
    .catch((error) => {
        setMessage(error.response.data.error)
        setTimeout(() => {setMessage(null)}, 1500) 
    }) 
}

// define a useEffect to re-render when a new photo is uploaded;
useEffect(() => {
    handleImageFetch()
}, [message]) 

// define a function to delete product image on the form;
const handleDeleteImage =  (_id) => {
    const removedImage = allImage.filter((img) => img._id === _id)
    const updateImages = allImage.filter((img) => img._id !== _id)
    setMessage('Image deleted')
    setAllImage(updateImages)
    axios
    .delete('http://localhost:4050/api/photo/delete/'+removedImage[0]._id)
    .then((response) => {
        const result = response.data
        setAllImage(result.imagesWithFileName); 
    })
    .catch((error) => {
        setMessage(error.response.data.error)
        setTimeout(() => {setMessage(null)}, 1500)
    }) 
    setTimeout(() => {
        setMessage(null)
    }, 1000)
}


// destructure the seller username from the user context;
const {user} = useContext(myUserContext)
const {username} = user

// Define a state to manage the product form
const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    stockQty: '',
})

// define a function to handle decimal value for price;
const handleDecimalsOnValue = (value) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
}

// define a function to manage product form change
const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((productForm) => {return {...productForm, 
        [name]: name === 'price' ? handleDecimalsOnValue(value) : value 
    }})
}

// define state to show if product form was successful or if there is error;
const [error, setError] = useState(null)

// define a function to handle form submit;
const handleFormSubmit = (e) => {
    e.preventDefault()
    // store the product form information in a variable
    const newProduct = {
        title: productForm.title,
        price: productForm.price,
        photo: [...allImage],
        description: productForm.description,
        category: productForm.category,
        brand: productForm.brand,
        stockQty: productForm.stockQty,
    }
    if (newProduct.photo.length == 0) {
        setError('All fields are required')
        return setTimeout(() => {
            setError(null)
        }, 1200)
    }
    // make a post request to the server
    axios
    .post('http://localhost:4050/api/shop/create/'+username, newProduct)
    .then((response) => {
        // navigate to success page
        setTimeout(()=> {
            navigate('/product-success');
            }, 1000)

        // clear the product form
        setProductForm({
            title: '',
            price: '',
            description: '',
            category: '',
            brand: '',
            stockQty: '',
        })
        // delete the images from the server after it has been stored in the product to save memory
        axios
        .delete('http://localhost:4050/api/photo/delete')
        .then((response) => {
            setMessage(null)
        })
        .catch((error) => {
            setMessage(error.response.data.error)
        })
        setTimeout(() => {
            setMessage(null)
        }, 1000)
    })
    .catch((error) => {
        setError(error.response.data.error)
        setTimeout(() => {setError(null)}, 1500)
    })
    
}

// define a state to show and hide the useProfile card;
const [active, setActive] = useState(false) 


return (

<section>

    <nav className='navigation'> 

    <div className='logo'>

        <Link to='/'> <h1> Pick<span className='colored'>N</span>Pay </h1> </Link> 

    </div>

    <div className='userProfile' > 
            <div  className='account' onClick={() => setActive(!active)}> 
                <BiUserCircle className='userIcon'></BiUserCircle>
                <span> Account {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> } </span> 
            </div>
    </div>

    {active ? <UserProfile></UserProfile> : null}

    </nav>

    {error && <p className='productError'> {error} </p>} 

    <form onSubmit={handleFormSubmit}>

        <div className='productForm'> 

            <label> Product Title <span className='required'> * </span></label> <br />
            <input type='text' value={productForm.title} onChange={handleChange} placeholder='' name='title' maxLength={30}/>
            
            
            <div className='price'>
                <label> Price <span className='required'> * </span></label> <br />
                <input type='number' value={productForm.price} onChange={handleChange} placeholder='' name='price'/>
            </div>

            <div className='photo'>
                <div className='customerFileBtn'>
                    <label>Upload photo of product <span className='required'> * </span> </label> <br />
                    <input type="file" name='image' accept="image/*" multiple onChange={(e) => {setImage(e.target.files[0])}} /> 
                    <button type="submit" onClick={handleUpload} className='uploadPhoto'> upload photo </button> {message && <span className='upload'> {message} </span>}
                </div>

                <div className='uploadWrapper'>
                    {allImage &&
                        allImage.map((photo, _id) => (
                            <div className='imageContainer'  key={_id}>
                                <img src={`../../../../../productphoto/${photo.filename}`} alt={photo.filename} />
                                <AiFillDelete className='deleteIcon' onClick={() => {handleDeleteImage(photo._id)}}></AiFillDelete>
                            </div> 
                        ))
                    
                    }
                </div>
            </div>

            <div className='description'>
                <label> Description <span className='required'> * </span></label> <br />
                <textarea value={productForm.description} onChange={handleChange} placeholder='' name='description'  minLength={1} maxLength={400} rows={6} cols={105}></textarea>
            </div>

            <div className='category'>
                <label> Select category <span className='required'> * </span> </label>  <br />
                <select value = {productForm.category} onChange={handleChange} name='category'>
                    <option value = "------"> ------------------------------ </option>
                    {availableProductCategory.map((category, index) => (
                        <option value={category} key={index}> {category} </option>
                    ))}
                    
                </select>
            </div>

            <div className='brand'>
                <label> Brand <span className='required'> * </span></label> <br />
                <input type='text' value={productForm.brand} onChange={handleChange} placeholder='' name='brand'/>
            </div>

            <div className='stockQty'>
                <label> Quantity in stock <span className='required'> * </span></label> <br />
                <input type='number' value={productForm.stockQty} onChange={handleChange} placeholder='' name='stockQty'  min={1}/>
            </div>

            <Button margin='20px 0px 40px' padding='10px 390px'> Click to submit </Button>

        </div>
    </form>
</section>

)
}

export default ProductForm