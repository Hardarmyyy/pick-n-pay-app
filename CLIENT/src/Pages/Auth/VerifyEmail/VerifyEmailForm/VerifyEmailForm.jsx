import React from 'react'
import { useEffect } from 'react'
import Button from '../../../../component/Button'


const VerifyEmailForm = ({status, signupOtp, invalid, error, handleChange, submitForm, inputRefs, handleBackspace}) => {


useEffect(() => {
    // Focus on the first input field when the component mounts
    inputRefs.one.current.focus();
}, []);

return ( 

<>

    <section className='w-96 h-auto mx-auto md:translate-y-10 lg:translate-y-20'>

        <p className='font-Jost md:text-xl lg:text-3xl text-blue-950 font-bold'> Email Verification </p>
        <p className='font-Montserrat text-lg mb-3 text-my-primary'> Kindly enter otp to verify your email below</p>

        <form onSubmit={submitForm} className='w-full text-sm font-Montserrat text-my-primary relative'>

            {Object.keys(signupOtp).map((fieldName, index) => (
                <input
                    key={index}
                    type='text'
                    className= 'w-12 h-12 rounded-lg mr-4 mb-3 p-2 text-3xl border-none outline outline-gray-200 text-center placeholder:absolute placeholder:text-2xl placeholder:-bottom-1 placeholder:left-5 focus:outline-2 focus:outline-blue-950 relative'
                    value={signupOtp[fieldName]}
                    onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(e, fieldName)}
                    onChange={handleChange}
                    placeholder='-'
                    name={fieldName}
                    ref={inputRefs[fieldName]}
                />
            ))}

            {error && <p className='text-crimson text-center absolute left-12'> {error}  </p> }

            <div className='text-center mt-3'>
                <Button padding='5px 60px' margin='10px auto'> { status === 'Loading.......' ? <span> Verifying ... </span> : <span> Verify email </span>   }  </Button> 
            </div>

        </form>

    </section>

</>

)
}

export default VerifyEmailForm