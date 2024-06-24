import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../../../../component/Spinner'
import Button from '../../../../component/Button'
import { BsEyeSlash, BsEye } from "react-icons/bs";



const SignupForm = ({newUser, error, handleChange, submitForm, showPassword, handleShowPassword}) => {

const status = useSelector((state) => state.auth.status)

return (

    <>
        <section className='w-full tablet:w-4/5 mini:w-3/4 laptop:w-1/2 super:w-3/5 mx-auto'> 

            <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-3 text-blue-950 font-bold text-center'> Sign up </p>

            <form className='w-full text-sm font-Montserrat text-my-primary bg-[#fcfcfc] rounded-md my-3 sm:px-2 md:px-4 tablet:px-4 mini:px-5 laptop:px-4 py-3' onSubmit={submitForm}> 

                <div className='w-full flex justify-center items-center mx-auto my-3 text-sm text-center text-blue-950 font-bold font-Montserrat relative'>

                    <label className='cursor-pointer mx-3'>
                        <input className="sr-only peer" name="userRole" type="radio" value="buyer" onChange={handleChange} />
                        <div className= "w-28 h-auto rounded-md peer-checked:font-semibold peer-checked:border-2 peer-checked:border-blue-950">
                            I am a buyer
                        </div>
                    </label>

                    <label className='cursor-pointer mx-3'>
                        <input className="sr-only peer" name="userRole" type="radio" value="seller" onChange={handleChange} />
                        <div className= "w-28 h-auto rounded-md peer-checked:font-semibold peer-checked:border-2 peer-checked:border-blue-950">
                            I am a seller
                        </div>
                    </label>

                    {error.userRole && <p className='absolute text-crimson left-0 top-5'> {error.userRole}  </p> }

                </div>

                <div className='relative mt-4'>
                    <label> Username <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type="text" 
                        className= 'w-full mt-1 p-2 border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                        value={newUser.username} 
                        onChange={handleChange} 
                        name="username" 
                        placeholder="Enter username"
                        maxLength={16}
                    />
                    {error.username && <p className='absolute text-crimson left-0'> {error.username}  </p> }
                </div>

                <div className='relative mt-4'>
                    <label> Email address <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type="text" 
                        className= 'w-full mt-1 p-2 border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950' 
                        value={newUser.email} 
                        onChange={handleChange} 
                        name="email" 
                        placeholder="Enter email address"
                        maxLength={30}
                    /> 
                    {error.email && <p className='absolute text-crimson left-0'> {error.email}  </p> }
                </div>

                <div className='relative mt-4'>
                    <label> Password  <span className='text-crimson'> * </span></label> <br />
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        className= 'w-full mt-1 p-2 border-transparent rounded-md shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:border-blue-950'
                        value={newUser.password} 
                        onChange={handleChange} 
                        name="password" 
                        placeholder="Enter password"
                        maxLength={22}
                    />
                    {error.password && <p className='absolute text-crimson left-0'> {error.password} </p> }

                    <div className="text-lg absolute top-9 right-4 cursor-pointer" onClick={handleShowPassword}>
                        {showPassword ? <BsEye /> : <BsEyeSlash />} 
                    </div>
                </div>

                <div className='text-center mt-4'>
                    <Button padding='10px 60px' margin='10px auto'> {status === 'Loading.......' ? <span> Signin up ... </span> : <span> Get Started </span>} </Button> 
                </div>

            </form>   

            <div className='text-center text-my-primary font-Montserrat text-sm'>
                <p> Already have an account ? Click <Link to='/login' className='text-blue-600'> here </Link> to login</p>
            </div>  

        </section>
    </>
)
}

export default SignupForm