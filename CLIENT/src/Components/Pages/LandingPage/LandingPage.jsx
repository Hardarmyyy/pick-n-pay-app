import React from 'react'
import Navigation from '../Navigation/Navigation'
import { useContext, useState} from 'react'
import { myUserContext } from '../../../Utilities/UserContext'
import { availableProductCategory } from '../../../Utilities/ProductContext'
import Footer from '../Footer/Footer'
import '../LandingPage/LandingPage.css'
import { Link } from 'react-router-dom'
import Carousel from './Carousel/Carousel'
import Slider from './Slider/Slider'

const LandingPage = () => {

// import user from myUserContext;
const {user, cartCounter} = useContext(myUserContext) 
const { username} = user

const [newsLetter, setNewsLetter] = useState({
    username: '',
    email: ''
})

// define a state to show when newsletter email have been successfully received
const [newsLetterSuccess, setNewsLetterSuccess] = useState(null)
const [newsLetterError, setNewsLetterError] = useState(null)

const handleChange = (e) => {
    setNewsLetter((newsLetter) => {return {...newsLetter, [e.target.name]: e.target.value.replace(/\s/g, "")}})
}

// define a regxpression to validate email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const handleSubmit = (e) => {
    e.preventDefault()
    if (!newsLetter.username || !newsLetter.email) {
        setNewsLetterError('Please enter name and email')
        return setTimeout(() => {
            setNewsLetterError(null)
        }, 1200)
    }
    else if (!(emailRegex.test(newsLetter.email))) {
        setNewsLetterError('Please enter a valid email')
        return setTimeout(() => {
            setNewsLetterError(null)
        }, 1200)
    }
    else {
        // console.log(newsLetter)
        setNewsLetter({
            username: '', 
            email: ''
        })
        setNewsLetterSuccess('Thank you for subscribing to our news letter! We will keep you informed')
        setTimeout(() => {
            setNewsLetterSuccess(null) 
        }, 2000)
    }
}

return (

<>
    {newsLetterSuccess && <p className='msgSuccess'> {newsLetterSuccess} </p>}
    
    <Navigation username={username} cartCounter={cartCounter} ></Navigation>
    
    <section className='pageContainer'> 

        <div className='topContainer'>

            <div className='productCategories'>
                {availableProductCategory.map((type, index) => 
                    <Link to={`/category/${type}`} key={index}> 
                        <p>  {type}  </p> 
                    </Link>
                )}
            </div>   

            <div className='carousel'>
                <Carousel></Carousel> 
            </div>

            <div className='newsLetter'>
                <p> Get latest updates on promo sales </p>

                <p> Receive alerts when we have new products </p> 
                {newsLetterError && <p className='msgError'> { newsLetterError} </p>}
                <form onSubmit={handleSubmit} >
                    <input type="text" name="username" placeholder="Enter your name" value={newsLetter.username} onChange={handleChange}  maxLength={35}/> 
                    <br />
                    <input type="text" name="email" placeholder="Enter your email address" value={newsLetter.email} onChange={handleChange}  maxLength={35}/> 
                    <br />
                    <button> Subscribe now </button>
                </form>
            </div>

        
        </div>

        <div className='productSlider'>
            <Slider></Slider>
        </div>

    </section>

    <Footer></Footer>
</>

)
}

export default LandingPage
