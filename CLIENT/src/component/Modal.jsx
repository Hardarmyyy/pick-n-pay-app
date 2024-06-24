import React from 'react'

const Modal = ({children}) => {

return (

<>

    <div className="bg-my-bg-primary w-full h-full fixed top-0 left-0 z-50"> 

        <div className= 'flex flex-col justify-center items-center font-Montserrat text-my-bg-primary relative loader'>

            {children}

        </div>

    </div>

</>

)
}

export default Modal