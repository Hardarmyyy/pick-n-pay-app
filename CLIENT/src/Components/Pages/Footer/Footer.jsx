import React from 'react'
import '../Footer/Footer.css'
import Button from '../../../Utilities/Button'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useState } from 'react';


const Footer = () => {

const [email, setEmail] = useState('')

const handleChange = (e) => {
    setEmail(e.target.value.replace(/\s/g, ""))
}

// define a state to show when email have been successfully received
const [emailSuccess, setEmailSuccess] = useState(null)
const [emailError, setEmailError] = useState(null)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!email) {
        setEmailError('Please enter email')
        return setTimeout(() => {
            setEmailError(null)
        }, 1200)
    }
    else if (!(emailRegex.test(email))) {
        setEmailError('Please enter a valid email address')
        return setTimeout(() => {
            setEmailError(null)
        }, 1200)
    }
    else {
        // const user = email
        setEmail('')
        setEmailSuccess('We have received your email! We will keep you informed with the lastest updates')
        setTimeout(() => {
            setEmailSuccess(null) 
        }, 2000)
    }
}


return (

<>
    {emailSuccess && <p className='emailSuccess'> {emailSuccess} </p>}
    
    <section className='footer'>

        <div className='footerTop'>

            <div className='logo'>
                
                <h1> Pick<span className='colored'>N</span>Pay </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid totam hic odit 
                    perspiciatis minima maxime architecto itaque sed quo! Error illo deserunt voluptas eum.</p>

            </div>

            <div className='footerLinksContainer'>

                <div className='footerLinks'>
                    <h4> About Us </h4>
                    <p>< Link> Affilates</Link> </p>
                    <p> <Link> Privacy Policy </Link> </p>
                    <p> <Link> Terms of Service </Link> </p>
                    <p> <Link> Return Policy </Link></p>
                    <p> <Link> Complaint </Link></p>
                </div>

                <div className='footerLinks'>
                    <h4> Support </h4>
                    <p> <Link> Help Center </Link> </p>
                    <p> <Link> FAQs </Link> </p>
                </div>

                <div>

                    <div className='footerLinks'>
                        <h4> Contact Us </h4>
                        <address> Address </address>
                        <p> 230 Herbert Macualay Way, </p>
                        <p> Yaba, Lagos, </p>
                        <p> Nigeria. </p>
                    </div>

                    <div className='footerLinks'>
                        <h4> Phone Number </h4>
                        <p> + 000-000-000 </p>
                    </div>

                </div>

            </div>

        </div>

        <div className='footerBottom'>

            <div className='updates'>

                <h4> Get Update </h4>
                <p> We're growing fast. Get daily update </p>

                <div className='emailAlerts'>
                    <form onSubmit={handleFormSubmit}>
                        <input type='text' placeholder='Enter your email address' name='email' value={email} onChange={handleChange} maxLength={45}/>
                        <Button padding='10px 15px'> Join now </Button>
                    </form>
                    {emailError && <p className='emailErr'> {emailError} </p>}
                </div>

            </div>

            <div className='socialMedia'>

                <p> Follow us on social media </p>

                <div className='icons'>
                    <Link> <FaFacebookF className='footerIcons'></FaFacebookF> </Link>
                    <Link> <FaTwitter className='footerIcons'></FaTwitter> </Link>
                    <Link> <FaLinkedinIn className='footerIcons'></FaLinkedinIn> </Link>
                </div>

            </div>

            <p> &copy; 2023 PickNPay. All rights reserved </p>

        </div>


    </section>
</>

)
}

export default Footer