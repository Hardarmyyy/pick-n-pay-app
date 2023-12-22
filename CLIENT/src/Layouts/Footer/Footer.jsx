import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Button from '../../component/Button'
import { FaFacebookF } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa"
import UseValidateForgotPasswordForm from '../../Hooks/UseValidateForgotPasswordForm'
import './Footer.css'
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
    
    <section className='footer'>

        <div className='footerTop'>

            <div className='logo'>
                
                <h1> Pick<span className='colored'>N</span>Pay </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid totam hic odit perspiciatis minima maxime architecto itaque sed quo! Error illo deserunt voluptas eum.</p>

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
                        <input type='text' 
                        className= {invalid?.email ? 'invalid' : null}
                        placeholder='Enter your email address' 
                        name='email' 
                        value={user.email} 
                        onChange={handleChange} 
                        maxLength={45}/>
                        <Button padding='10px 40px'> Join now </Button>
                    </form>
                    {error && <p className='emailErr'> {error.email} </p>}

                </div>

            </div>

            <div className='socialMedia'>

                <p> Follow us on social media </p>

                <div className='icons'>
                    <Link to='#'> <FaFacebookF className='footerIcons'></FaFacebookF> </Link>
                    <Link to='#'> <FaTwitter className='footerIcons'></FaTwitter> </Link>
                    <Link to='#'> <FaLinkedinIn className='footerIcons'></FaLinkedinIn> </Link>
                </div>

            </div>

            <p> &copy; 2023 PickNPay. All rights reserved </p>

        </div>

    </section>
</>

)
}

export default Footer