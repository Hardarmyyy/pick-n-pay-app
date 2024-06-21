import React from 'react'
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
    
    <section className='w-full min-h-screen sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60'> 

        <div className="sm:hidden md:hidden w-40 h-72 py-2 bg-gray-200 rounded-md shadow-sm pl-2 text-my-primary font-Montserrat sticky top-0">
            <Categories></Categories>
        </div>

        <Carousel></Carousel> 

        <div className='sm:hidden md:hidden'>
            <NewsLetter></NewsLetter>
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
