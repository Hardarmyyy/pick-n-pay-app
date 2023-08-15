import React from 'react'
import '../SignUp/SignUp.css'
import Button from '../../../Utilities/Button'
import { useState } from 'react'
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
    
const navigate = useNavigate();

// define a state to handle userType;
const [userType, setUserType] = useState('');

const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
};

// define a state to handle signup form;
const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
}) 

const handleUser = (e) => {
    setNewUser((newUser) => {return {...newUser, [e.target.name]: e.target.value.replace(/\s/g, "")}})
}

// define a state to handle show password
const [showPassword, setShowPassword] = useState(false)

// define a function to handle show password;
const handleShowPassword = () => {
    setShowPassword(!showPassword)
}

// define state to show if signup was successful or if there is error;
const [message, setMessage] = useState(null)
const [error, setError] = useState(null)

//define a function to handle signup form submit

const handleSubmit = (e) => { 
    e.preventDefault()
    const regUser ={
        usertype: userType,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
    }

    axios
    .post('http://localhost:4050/api/user/signup', regUser)
    .then((response) => {

        setMessage('account created successfully')
        setTimeout(()=> {
        setMessage(null)
        }, 1500)

        setTimeout(()=> {
            setNewUser({
                username: '',
                email: '',
                password: '',
            }) 
        }, 800)

        // save the userdata in local storage;
        localStorage.setItem('user', JSON.stringify(response.data))

        // navigate to login page
        setTimeout(()=> {
            navigate('/login')
            }, 2200)
    })
    .catch((error) => {
        setError(error.response.data.error)
        setTimeout(()=> {
        setError(null)
        }, 1500)
    });
}

return (

<>
    
    <nav className='navigation'> 

        <div className='logo'>

            <Link to='/'> <h1> Pick<span className='colored'>N</span>Pay </h1> </Link> 

        </div>
        
    </nav>

    {message && <p className='signupMessage'> {message} </p>}
    {error && <p className='signupError'> {error} </p>} 

    <section className='signUpContainer'> 

        <div className='formHeader'>
            <h2> Sign up </h2>
            <p> To sign up, fill in your personal details below.</p>
        </div>

        <form className='registerForm' onSubmit={handleSubmit}>

            <div className='userSelect'>
                <div className='buyer'>
                    <label> <input type='radio' value='buyer' checked={userType === 'buyer'} onChange={handleUserTypeChange} name='buyer'/> I am a buyer </label> 
                </div>

                <div className='seller'>
                    <label> <input type='radio' value='seller' checked={userType === 'seller'} onChange={handleUserTypeChange} name='seller'/> I am a seller </label> 
                </div>
            </div>

            <div>
                <label> Name <span className='required'> * </span></label> <br />
                <input type='text' className= {error ? 'error': 'input'} value={newUser.username} onChange={handleUser} placeholder='Enter your name or username' name='username'  maxLength={30}/>
            </div>

            <div>
                <label> Email <span className='required'> * </span></label> <br />
                <input type='email' className= {error ? 'error': 'input'} value={newUser.email} onChange={handleUser} placeholder='Enter your email' name='email'  maxLength={50}/>
            </div>

            <div>
                <label> Password <span className='required'> * </span></label> <br />
                <input type={showPassword ? 'text' : 'password'} className= {error ? 'error': 'input'} value={newUser.password} onChange={handleUser} placeholder='Create a password' name='password' /> <br />
                <p> Must be at least 8 characters </p>
            </div>

            <div className='button'>
                <Button padding='5px 100px'> Get Started </Button>
            </div>
            
            <p className='goToLogin'> Already have an account. Click <Link to='/login'> here </Link> to sign in</p>
            
            <div className="passwordToggle" onClick={handleShowPassword}>
                    {showPassword ? <BsEye /> : <BsEyeSlash />}
            </div>

        </form>     

    </section>
</>
)
}

export default SignUp
