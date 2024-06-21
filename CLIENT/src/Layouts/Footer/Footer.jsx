import React from 'react'
import UseFooter from '../../Hooks/Footer/UseFooter'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { FaFacebookF } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa"
import 'react-toastify/dist/ReactToastify.css';


const Footer = () => {

const {user, error, handleChange, handleFormSubmit} = UseFooter()

const handleSubmit = async (e) => {
    e.preventDefault()
    await handleFormSubmit()
}

return (

<>
    
        <ToastContainer 
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}/>
    
    <footer className='w-full bg-blue-50 sm:px-2 md:px-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 pt-10 pb-10'>

        <section className='flex justify-between items-start sm:flex-col md:flex-col'>

            <div className='w-1/2 sm:w-full md:w-full tablet:w-1/2 mini:w-1/2 laptop:w-1/2 super:w-1/2 sm:mb-5 md:mb-5 text-center'>
                
                <h6 className='text-2xl text-blue-950 font-bold font-Jost'> Pick<span className='text-crimson'>N</span>Pay </h6>
                <p className='font-Montserrat text-my-primary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid totam hic odit perspiciatis minima maxime architecto itaque sed quo! Error illo deserunt voluptas eum.</p>

            </div>

            <div className='w-1/2 sm:w-full md:w-full tablet:w-1/2 mini:w-1/2 laptop:w-1/2 super:w-1/2 tablet:ms-2 mini:ms-4 laptop:ms-20 super:ms-40 grid grid-cols-3 gap-2 font-Montserrat'>

                <div className=''>
                    <h6 className='cursor-pointer font-Jost text-lg text-blue-950 font-bold'> About Us </h6>
                    <ul className='text-sm'>
                        <li> <Link> Affilates</Link>  </li>
                        <li> <Link> Privacy Policy </Link>  </li>
                        <li> <Link> Terms of Service </Link>  </li>
                        <li> <Link> Return Policy </Link> </li>
                        <li> <Link> Complaint </Link> </li>
                    </ul>
                </div>

                <div className=''>
                    <h6 className='cursor-pointer font-Jost text-lg text-blue-950 font-bold'> Support </h6>
                    <ul className='text-sm'>
                        <li> <Link> Help Center </Link> </li>
                        <li> <Link> FAQs </Link> </li>
                    </ul>
                </div>

                <div className='flex flex-col-reverse'>

                    <div className='text-sm'>
                        <h6 className='cursor-pointer font-Jost text-lg text-blue-950 font-bold'> Contact Us </h6>
                        <p> 230 Herbert Macualay Way, </p>
                        <p> Yaba, Lagos, </p>
                        <p> Nigeria. </p>
                    </div>

                    <div>
                        <h6 className='cursor-pointer font-Jost text-lg text-blue-950 font-bold'> Phone Number </h6>
                        <p className='text-sm'> + 000-000-000 </p>
                    </div>

                </div>

            </div>

        </section>

        <section className='sm:flex sm:flex-col sm:text-center sm:justify-between sm:items-center md:flex md:flex-col md:text-center md:justify-between md:items-center mt-8'>

            <div className='sm:w-full md:w-full sm:flex sm:flex-col sm:text-center sm:justify-between sm:items-center md:flex md:flex-col md:text-center md:justify-between md:items-center flex justify-between items-end'>
                <div className='sm:w-full md:w-full tablet:w-1/2 mini:w-1/2 laptop:w-1/2 super:w-1/2 text-center text-my-primary font-Montserrat'>

                    <h6 className='font-Jost text-lg text-blue-950 font-bold'> Get Update </h6>
                    <p className='text-sm'> We're growing fast. Get daily update </p>

                    <form onSubmit={handleSubmit} className='w-full mt-2 flex justify-center items-center'>
                        
                        <div className='sm:w-3/4 md:w-3/4 tablet:w-3/4 mini:w-3/4 laptop:w-3/4 super:w-3/4 mr-2 relative'>
                            <input 
                                type='text' 
                                className='w-full p-2 border-transparent rounded-md text-sm shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-2 focus:border-blue-900'
                                placeholder='Enter your email address' 
                                name='email' 
                                value={user.email} 
                                onChange={handleChange} 
                                maxLength={40}
                            />
                            {error && <p className='absolute -bottom-5 left-0 text-crimson text-sm font-Montserrat'> {error.email} </p>}
                        </div>
                        
                        <button className='py-2 px-4 rounded-md bg-blue-900 text-white hover:bg-blue-950'> 
                            <svg className="w-5 h-5 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
                            </svg>
                        </button>

                    </form>

                </div>

                <div className='sm:w-full sm:mt-8 md:w-full tablet:w-1/2 mini:w-1/2 laptop:w-1/2 super:w-1/2 text-center md:mt-8'>

                    <p className='font-Jost text-lg text-blue-950 font-bold'> Follow us on social media </p>

                    <div className='sm:w-1/2 md:w-52 tablet:w-1/2 mini:w-1/2 laptop:w-2/5 super:w-1/4 grid grid-cols-3 gap-2 mx-auto sm:text-lg text-2xl mt-2'>

                        <div className='flex justify-center items-center'>
                            <div className='sm:w-8 sm:h-8 w-12 h-12 rounded-md cursor-pointer relative bg-blue-900 hover:bg-blue-950'>
                                <Link to='#'> <FaFacebookF className='absolute sm:top-2 sm:left-2 top-3 left-3 text-white'></FaFacebookF> </Link>
                            </div>
                        </div>

                        <div className='flex justify-center items-center'>
                            <div className='sm:w-8 sm:h-8 w-12 h-12 rounded-md relative cursor-pointer bg-blue-900 hover:bg-blue-950'>
                                <Link to='#'> <FaTwitter className='absolute sm:top-2 sm:left-2 top-3 left-3 text-white'></FaTwitter> </Link>
                            </div>
                        </div>

                        <div className='flex justify-center items-center'>
                            <div className='sm:w-8 sm:h-8 w-12 h-12 rounded-md relative cursor-pointer bg-blue-900 hover:bg-blue-950'>
                                <Link to='#'> <FaLinkedinIn className='absolute sm:top-2 sm:left-2 top-3 left-3 text-white'></FaLinkedinIn> </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            
            <p className='font-Montserrat text-sm text-center sm:mt-8 md:mt-8 tablet:mt-14 mini:mt-20 laptop:mt-20 super:mt-20'> &copy; 2023 PickNPay. All rights reserved </p>

        </section>

    </footer>
</>

)
}

export default Footer