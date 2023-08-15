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

const handleChange = (e) => {
    setNewsLetter((newsLetter) => {return {...newsLetter, [e.target.name]: e.target.value}})
}

const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(newsLetter)
    setNewsLetter({
        username: '',
        email: ''
    })
}

return (

<>
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

                <form onSubmit={handleSubmit} >
                    <input type="text" name="username" placeholder="Enter your name" value={newsLetter.username} onChange={handleChange} required maxLength={35}/> 
                    <br />
                    <input type="email" name="email" placeholder="Enter your email address" value={newsLetter.email} onChange={handleChange} required maxLength={35}/> 
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
