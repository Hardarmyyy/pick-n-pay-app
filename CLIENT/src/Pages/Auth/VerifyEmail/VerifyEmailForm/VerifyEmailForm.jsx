import React from 'react'
import { useEffect } from 'react'
import './VerifyEmailForm.css'
import Button from '../../../../component/Button'


const VerifyEmailForm = ({status, signupOtp, invalid, error, handleChange, submitForm, inputRefs, handleBackspace}) => {


useEffect(() => {
    // Focus on the first input field when the component mounts
    inputRefs.one.current.focus();
}, []);

return ( 

<>

    <section className='verifyEmailContainer'>

        <div className='verifyEmailHeader'>
            <h2> Email Verification </h2>
            <p> Kindly enter otp to verify your email below</p>
        </div>

        <form onSubmit={submitForm}>

            <div className='verifyEmailCode'>

                {Object.keys(signupOtp).map((fieldName, index) => (
                    <input
                        key={index}
                        type='text'
                        className={invalid[fieldName] ? 'invalid' : null}
                        value={signupOtp[fieldName]}
                        onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(e, fieldName)}
                        onChange={handleChange}
                        placeholder='-'
                        name={fieldName}
                        ref={inputRefs[fieldName]}
                    />
                ))}

                {error && <p className='empty verifyOtp'> {error}  </p> }

            </div>

            <div className='button'>
                <Button padding='5px 100px'> { status === 'Loading.......' ? <span> Verifying ... </span> : <span> Verify email </span>   }  </Button> 
            </div>

        </form>

    </section>

</>

)
}

export default VerifyEmailForm