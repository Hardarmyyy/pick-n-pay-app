import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Button from '../../component/Button'
import { FaFacebookF } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa"
import UseValidateForgotPasswordForm from '../../Hooks/Auth/ForgotPassword/UseValidateForgotPasswordForm'
import 'react-toastify/dist/ReactToastify.css';


const Footer = () => {

// define a state to handle user email
const [user, setUser] = useState({
    email: ''
})

const [error, setError] = useState({})
const [invalid, setInvalid] = useState({})

const handleChange = (e) => {
    const {name, value} = e.target
    setUser((user) => { return {...user, [name]: value.replace(/\s/g, "")} })

    if (name === 'email') {
        setError((error) => { return {...error, email: value ? '' : 'Enter email address'}})
        setInvalid((invalid) => { return {...invalid, email: value ? false : true }})
    }
}

const {errors, invalids} = UseValidateForgotPasswordForm (user)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const handleCanSave = (value) => {
    const canSubmit = Boolean(emailRegex.test(value.email)) // enable the submit button 

    return canSubmit
}

const isSave = handleCanSave(user)

const handleFormSubmit = (e) => {
    e.preventDefault()

    setError(errors)
    setInvalid(invalids)

    if(isSave) {
        toast.success('Thank you!. Updates will be sent to your email address', {
            toastStyle: { background: 'green', color: 'white' }
        })
        setUser({
            email: ''
        })
    }
}

useEffect(() => {
    handleCanSave(user)
}, [user])

return (

<>
    
        <ToastContainer 
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}/>
    
    <footer className='min-w-full bg-blue-50 p-4'>

        <section className='flex justify-around items-start md:flex-wrap lg:flex-nowrap'>

            <div className='md:w-1/2 md:mb-4 text-center'>
                
                <h6 className='text-2xl text-blue-950 font-bold font-Jost'> Pick<span className='text-crimson'>N</span>Pay </h6>
                <p className='md:text-center lg:text-left font-Montserrat text-my-primary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid totam hic odit perspiciatis minima maxime architecto itaque sed quo! Error illo deserunt voluptas eum.</p>

            </div>

            <div className='md:w-full lg:w-3/4 flex lg:justify-evenly md:justify-around items-start'>

                <div>
                    <h6 className='cursor-pointer font-Jost text-lg text-blue-950 font-bold'> About Us </h6>
                    <ul>
                        <li> <Link> Affilates</Link>  </li>
                        <li> <Link> Privacy Policy </Link>  </li>
                        <li> <Link> Terms of Service </Link>  </li>
                        <li> <Link> Return Policy </Link> </li>
                        <li> <Link> Complaint </Link> </li>
                    </ul>
                </div>

                <div>
                    <h6 className='cursor-pointer font-Jost text-lg text-blue-950 font-bold'> Support </h6>
                    <ul>
                        <li> <Link> Help Center </Link> </li>
                        <li> <Link> FAQs </Link> </li>
                    </ul>
                </div>

                <div className='flex flex-col-reverse font-Montserrat font-my-primary'>

                    <div>
                        <h6 className='cursor-pointer font-Jost text-lg text-blue-950 font-bold'> Contact Us </h6>
                        <p> 230 Herbert Macualay Way, </p>
                        <p> Yaba, Lagos, </p>
                        <p> Nigeria. </p>
                    </div>

                    <div>
                        <h6 className='cursor-pointer font-Jost text-lg text-blue-950 font-bold'> Phone Number </h6>
                        <p> + 000-000-000 </p>
                    </div>

                </div>

            </div>

        </section>

        <section className='flex justify-around md:items-end lg:items-center pt-8 pb-20 md:flex-wrap lg:flex-nowrap'>

            <div className='w-96 text-my-primary font-Montserrat text-left'>

                <h6 className='font-Jost text-lg text-blue-950 font-bold text-center'> Get Update </h6>
                <p className='text-sm text-center'> We're growing fast. Get daily update </p>

                <form onSubmit={handleFormSubmit} className='relative'>
                    <input 
                        type='text' 
                        className='w-72 mt-3 p-2 border-2 rounded-md text-sm shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-blue-900'
                        placeholder='Enter your email address' 
                        name='email' 
                        value={user.email} 
                        onChange={handleChange} 
                        maxLength={40}
                    />

                    <button className='ml-3 py-2 px-4 rounded-md bg-blue-900 text-white hover:bg-blue-950'> Join now </button>

                    {error && <p className='absolute left-0 text-crimson text-sm font-Montserrat'> {error.email} </p>}

                </form>

            </div>

            <div>

                <p className='font-Jost text-lg text-blue-950 font-bold'> Follow us on social media </p>

                <div className='w-56 flex justify-around text-2xl mt-2'>
                    <div className='w-5 h-5 rounded-md p-4 relative cursor-pointer bg-blue-950'>
                        <Link to='#'> <FaFacebookF className='absolute top-3 left-3 text-white'></FaFacebookF> </Link>
                    </div>

                    <div className='w-5 h-5 rounded-md p-4 relative cursor-pointer bg-blue-950'>
                        <Link to='#'> <FaTwitter className='absolute top-3 left-3 text-white'></FaTwitter> </Link>
                    </div>

                    <div className='w-5 h-5 rounded-md p-4 relative cursor-pointer bg-blue-950'>
                        <Link to='#'> <FaLinkedinIn className='absolute top-3 left-3 text-white'></FaLinkedinIn> </Link>
                    </div>
                </div>

            </div>

            <p className='font-Montserrat text-sm md:mt-20 lg:mt-0'> &copy; 2023 PickNPay. All rights reserved </p>

        </section>

    </footer>
</>

)
}

export default Footer