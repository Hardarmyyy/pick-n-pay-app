import React from 'react'
import SuccessIcon from '../../component/SuccessIcon'


const SignUpModal = ({handleOpenModal}) => {


return ( 

    <>
        <div className="bg-my-bg-primary w-full h-full fixed top-0 left-0 z-50"> 

            <div className= 'w-96 h-96 flex flex-col justify-center items-center font-Montserrat text-my-primary mx-auto rounded-md p-4 bg-white lg:translate-y-28 md:translate-y-20 relative'>

                <SuccessIcon></SuccessIcon>
                <p className='text-bold text-2xl my-2'> Thank you for signing up.</p>
                <p className='text-lg text-center'> Verification code has been sent to your email successfully.</p>
                <p className='text-md my-2'> Kindly verify your email to continue </p>

                <button onClick={handleOpenModal} className='absolute top-4 right-5 text-4xl text-crimson'> X </button>

            </div>

        </div>
    </>

)
}

export default SignUpModal