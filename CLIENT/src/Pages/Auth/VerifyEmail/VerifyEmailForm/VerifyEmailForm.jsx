import React from 'react'
import { useEffect } from 'react'
import Button from '../../../../component/Button'


const VerifyEmailForm = ({verifyEmailStatus, signupOtp, error, handleChange, submitForm, inputRefs, handleBackspace}) => {


useEffect(() => {
    // Focus on the first input field when the component mounts
    inputRefs.one.current.focus();
}, []);

return ( 

<>

    <div className='w-full tablet:w-4/5 mini:w-3/4 laptop:w-1/2 super:w-3/5 mx-auto flex flex-col justify-center items-center'>

        <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-3 text-blue-950 font-bold text-center'> Email Verification </p>
        <p className='font-Montserrat text-sm mb-3 text-my-primary'> Kindly enter otp to verify your email below</p>

        <form  onSubmit={submitForm} className='w-full text-sm font-Montserrat text-my-primary flex flex-col items-center justify-center'>

            <div className='relative'>
                {Object.keys(signupOtp).map((fieldName, index) => (
                    <input
                        key={index}
                        type='text'
                        className='ssm:w-8 ssm:h-8 sm:w-8 sm:h-8 w-12 h-12 rounded-lg mr-4 mb-3 p-2 ssm:text-xl sm:text-xl md:text-2xl text-3xl border-transparent outline outline-gray-200 text-center placeholder:absolute placeholder:text-2xl placeholder:-bottom-1 ssm:placeholder:left-3 sm:placeholder:left-3 placeholder:left-5 focus:outline-2 focus:border-blue-950 relative'
                        value={signupOtp[fieldName]}
                        onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(e, fieldName)}
                        onChange={handleChange}
                        placeholder='-'
                        name={fieldName}
                        ref={inputRefs[fieldName]}
                    />
                ))}

                {error && <p className='text-crimson text-start absolute left-0'> {error}  </p> }
            </div>

            <div className='text-center mt-3'>
                <Button padding='10px 60px' margin='10px auto'> { verifyEmailStatus === 'Loading...' ? <span> Verifying ... </span> : <span> Verify email </span>   }  </Button> 
            </div>

        </form>

    </div>

</>

)
}

export default VerifyEmailForm