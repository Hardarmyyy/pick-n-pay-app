import React from 'react'
import { useContext } from 'react'
import { myUserContext } from '../../../Utilities/UserContext'
import '../Login/Login.css'
import { useState } from 'react'
import Button from '../../../Utilities/Button'
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { Link, useNavigate  } from 'react-router-dom'
import axios from 'axios'

const Login = () => { 

const navigate = useNavigate();

//import loginSuccess Function from myUserContext
const {sellerLoginSuccess, buyerLoginSuccess} = useContext(myUserContext)

// define a state to user Login;
const [currentUser, setCurrentUser] = useState({
    username: '',
    password: ''
})

const handleUser = (e) => {
    setCurrentUser((currentUser) => {return {...currentUser, [e.target.name]: e.target.value.replace(/\s/g, "")}})
} 

// define a state to handle show password
const [showPassword, setShowPassword] = useState(false)

// define a function to handle show password;
const handleShowPassword = () => {
    setShowPassword(!showPassword)
}

// define state to show if login was successful or if there is error;
const [message, setMessage] = useState(null)
const [error, setError] = useState(null)

//define a function to handle login form submit to the server

const handleSubmit = async (e) => {
    e.preventDefault()

    // make a post request to the server for user login;
    axios
    .post('http://localhost:4050/api/user/login', currentUser)
    .then((response) => {

    setMessage('Login success')
    setTimeout(()=> {
    setMessage(null)
    setCurrentUser({
        username: '',
        password: ''
    }) 
    }, 1500)

    const userData = response.data
    // update the usercontext;
    if (userData.usertype === 'buyer') {
        // save the userdata in local storage;
        localStorage.setItem('buyer', JSON.stringify(userData))
        buyerLoginSuccess(userData.token, userData.usertype, userData.username, userData.cartProducts, userData.favourites, userData.orders)
    }
    else if (userData.usertype === 'seller') {
        // save the userdata in local storage;
        localStorage.setItem('seller', JSON.stringify(userData)) 
        sellerLoginSuccess(userData.token, userData.usertype, userData.username, userData.cartProducts, userData.shop, userData.order)
    }
    
    // navigate to home page
    setTimeout(()=> {
        navigate('/')
        }, 2000)
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

    {message && <p className='loginMessage'> {message} </p>}
    {error && <p className='loginError'> {error} </p>}

    <section className='loginContainer'>

        <div className='loginHeader'>
            <h2> Login </h2>
        </div>

        <form className='loginForm' onSubmit={handleSubmit}>

            <div>
                <label> Name <span className='required'> * </span></label> <br />
                <input type='text' className={error ? 'error': 'input'} value={currentUser.username.trim()} onChange={handleUser} placeholder='Enter your username' name='username'  maxLength={30}/>
            </div>
        
            <div>
                <label> Password <span className='required'> * </span></label> <br />
                <input type={showPassword ? 'text' : 'password'} className={error ? 'error': 'input'} value={currentUser.password.trim()} onChange={handleUser} placeholder='Enter password' name='password' /> <br />
            </div>

            <div className='button'>
                <Button padding='5px 100px' margin='30px auto'> Login </Button>
            </div>

            <p className='goToSignUp'> Don't have an account ? Click <Link to='/signup'> here </Link> to sign up </p>

            <div className="passwordToggle" onClick={handleShowPassword}>
                {showPassword ? <BsEye /> : <BsEyeSlash />}
            </div> 

        </form>     

    </section> 

</>

)
}

export default Login
