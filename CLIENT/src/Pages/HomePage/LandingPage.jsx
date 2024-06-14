import React from 'react'
import Navigation from '../../Layouts/Navigation/Navigation'
import Footer from '../../Layouts/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import Carousel from '../../component/Carousel/Carousel'
import Categories from '../../component/Categories/Categories'
import NewsLetter from '../../Layouts/NewsLetter/NewsLetter'
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {


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
    
    <section className='min-w-full my-4 px-4 flex justify-between items-start'> 

        <div className="w-40 h-72 py-2 bg-gray-200 rounded-md shadow-sm text-center text-my-primary font-Montserrat sticky top-0">
            <Categories></Categories>
        </div>

        <Carousel></Carousel> 

        <NewsLetter></NewsLetter>


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
