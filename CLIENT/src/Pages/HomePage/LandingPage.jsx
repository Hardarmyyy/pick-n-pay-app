import React from 'react'
import Navigation from '../../Layouts/Navigation/Navigation'
import Footer from '../../Layouts/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import Carousel from '../../component/Carousel/Carousel'
import Categories from '../../component/Categories/Categories'
import UseNewsletter from '../../Hooks/Newsletter/UseNewsletter'
import NewsLetter from '../../Layouts/NewsLetter/NewsLetter'
import './LandingPage.css'
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {

const {newsLetter, error, invalid, handleChange, handleSubmitNewsLetter} = UseNewsletter()

const handleSubmit = (e) => {
    e.preventDefault()
    handleSubmitNewsLetter()
}

return (

<>

    <ToastContainer 
        position='top-right'
        autoClose={4000}
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

            <NewsLetter
                newsLetter={newsLetter}
                error={error}
                invalid={invalid}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            >
            </NewsLetter>

        
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
