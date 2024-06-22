import React from 'react'
import UseNewsletter from '../../Hooks/Newsletter/UseNewsletter'

const AsideNewsLetter = () => {

const {newsLetter, error, handleChange, handleSubmitNewsLetter} = UseNewsletter()

const handleSubmit = (e) => {
    e.preventDefault()
    handleSubmitNewsLetter()
}


return (

<>
    <section className='w-full p-2 font-Montserrat text-my-primary text-center'>

    <p className='text-sm text-center'> Get updates and receive alerts when we have new products </p> 

    <form onSubmit={handleSubmit} className='w-full relative' >

    <div className='relative'>
        <input 
            type="text" 
            name="username" 
            className='w-full mt-3 p-2 border-transparent rounded-md text-sm text-my-primary font-Montserrat shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-2 focus:border-gray-600'
            placeholder="Enter your name" 
            value={newsLetter.username} 
            onChange={handleChange}  maxLength={20}
        /> 
        {error && <p className='text-crimson text-sm absolute left-0 font-Montserrat'> {error.username} </p>}
    </div>

    <div className='relative mt-4'>
        <input 
            type="text" 
            name="email" 
            className='w-full p-2 border-transparent rounded-md text-sm text-my-primary font-Montserrat shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-2 focus:border-gray-600'
            placeholder="Enter your email address" 
            value={newsLetter.email} 
            onChange={handleChange}  
            maxLength={30}
        /> 
        {error && <p className='text-crimson text-sm absolute left-0 font-Montserrat'> {error.email} </p>}
    </div>

    <button className='font-Montserrat sm:px-3 md:px-4 py-2 text-sm mt-6 text-white bg-crimson rounded-md hover:bg-red-700'> Subscribe </button>

    </form>

    </section>
</>
)
}

export default AsideNewsLetter