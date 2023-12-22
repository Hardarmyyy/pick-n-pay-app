import React from 'react'
import { useState, useEffect} from 'react'
import Navigation from '../../Layouts/Navigation/Navigation'
import Footer from '../../Layouts/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import Carousel from '../../component/Carousel/Carousel'
import Categories from '../../component/Categories/Categories'
import './LandingPage.css'
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {

const [newsLetter, setNewsLetter] = useState({
    username: '',
    email: '' 
})

const [error, setError] = useState({})
const [invalid, setInvalid] = useState({})

const handleChange = (e) => {
    const {name, value} = e.target
    setNewsLetter((newsLetter) => {return {...newsLetter, [name]: value.replace(/\s/g, "")}})

    if (name === 'username') {
        setError((error) => { return {...error, username: value ? '' : 'Enter username'}})
        setInvalid((invalid) => { return {...invalid, username: value ? false : true }})
    }
    else if (name === 'email') {
        setError((error) => { return {...error, email: value ? '' : 'Enter email address'}})
        setInvalid((invalid) => { return {...invalid, email: value ? false : true }})
    }
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const handleCanSave = (value) => {
    const canSubmit = [
        value.username && 
        emailRegex.test(value.email)
    ].every(Boolean) // enable the submit button 

    return canSubmit
}

const isSave = handleCanSave(newsLetter)

const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isSave) {
        console.log('submitted')
    }
}

useEffect(() => {
    handleCanSave(newsLetter)
}, [newsLetter])

return (

<>

    <ToastContainer 
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}/>
    
    <Navigation ></Navigation>
    
    <section className='pageContainer'> 

        <div className='topContainer'>

            <Categories></Categories>

            <div className='carousel'>
                <Carousel></Carousel> 
            </div>

            <div className='newsLetter'>

                <p> Get updates and receive alerts when we have new products </p> 
                
                <form onSubmit={handleSubmit} >
                    
                    <input type="text" 
                    name="username" 
                    className={invalid.username ? 'invalid' : null}
                    placeholder="Enter your name" 
                    value={newsLetter.username} 
                    onChange={handleChange}  maxLength={35}/> 
                    <br />
                    {error && <p className='emailErr'> {error.username} </p>}

                    <input type="text" 
                    name="email" 
                    className={invalid.email ? 'invalid' : null}
                    placeholder="Enter your email address" 
                    value={newsLetter.email} 
                    onChange={handleChange}  
                    maxLength={35}/> 
                    <br />
                    {error && <p className='emailErr'> {error.email} </p>}

                    <button> Subscribe now </button>
                </form>

            </div>

        
        </div>
        {/* slide.js was removed in favor of photos */}
        {/* <div className='productSlider'>
            <Slider></Slider>
        </div> */}

    </section>

    <Footer></Footer>
</>

)
}

export default LandingPage
