import React from 'react'
import './NewsLetter.css'

const NewsLetter = ({newsLetter, error, invalid, handleChange, handleSubmit}) => {


  return (
    <>
        <div className='newsLetter'>

            <p> Get updates and receive alerts when we have new products </p> 

            <form onSubmit={handleSubmit} >
                
                <input type="text" 
                name="name" 
                className={invalid.name ? 'invalid' : null}
                placeholder="Enter your name" 
                value={newsLetter.name} 
                onChange={handleChange}  maxLength={20}/> 
                <br />

                <input type="text" 
                name="email" 
                className={invalid.email ? 'invalid' : null}
                placeholder="Enter your email address" 
                value={newsLetter.email} 
                onChange={handleChange}  
                maxLength={25}/> 
                <br />

                {error && <p className='emailErr'> {error.name} </p>}
                {error && <p className='emailErr'> {error.email} </p>}
                {error && <p className='emailErr'> {error.multi} </p>}

                <button> Subscribe now </button>
            </form>

        </div>
    </>
  )
}

export default NewsLetter