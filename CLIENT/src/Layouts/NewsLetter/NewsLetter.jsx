import React from 'react'

const NewsLetter = ({newsLetter, error, handleChange, handleSubmit}) => {


  return (
    <>
        <section className='md:w-44 lg:w-56 h-72 py-2 md:px-1 lg:px-3 font-Montserrat text-my-primary bg-gray-200 rounded-md shadow-sm text-center'>

            <p className='lg:text-lg md:text-sm'> Get updates and receive alerts when we have new products </p> 

            <form onSubmit={handleSubmit} className='md:w-full lg:w-full relative' >
                
                <input 
                  type="text" 
                  name="name" 
                  className='w-full mt-3 p-2 border rounded-md text-sm text-my-primary font-Montserrat shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-gray-400'
                  placeholder="Enter your name" 
                  value={newsLetter.name} 
                  onChange={handleChange}  maxLength={20}
                /> 

                <input 
                  type="text" 
                  name="email" 
                  className='w-full mt-3 p-2 border rounded-md text-sm text-my-primary font-Montserrat shadow-sm bg-white placeholder:italic placeholder:text-slate-400 focus:outline-2 focus:outline-gray-400'
                  placeholder="Enter your email address" 
                  value={newsLetter.email} 
                  onChange={handleChange}  
                  maxLength={25}
                /> 

                {error && <p className='text-crimson text-sm absolute left-0 font-Montserrat'> {error.name} </p>}
                {error && <p className='text-crimson text-sm absolute left-0 font-Montserrat'> {error.email} </p>}
                {error && <p className='text-crimson text-sm absolute left-0 font-Montserrat'> {error.multi} </p>}

                <button className='font-Montserrat md:px-2 lg:px-3 py-1 mt-4 text-white bg-crimson rounded-md hover:bg-red-700'> Subscribe now </button>

            </form>

        </section>
    </>
  )
}

export default NewsLetter