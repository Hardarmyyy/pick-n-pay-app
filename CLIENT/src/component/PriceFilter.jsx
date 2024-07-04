import React from 'react'

const PriceFilter = () => {

return (

<>
    <div className='w-full text-sm p-2'>

        <div className='w-full flex justify-between items-center'>
            <span className='font-bold'> Price </span>
            <button type="button" className="text-crimson"> Apply </button>
        </div>

        <div>

            <div className="w-full h-1 bg-crimson relative rounded-md mt-3"> 
                <div className="price-slider"> 
                </div> 
            </div>

            <div className="range-input"> 
                <input 
                    type="range" 
                    className="min-range" 
                /> 
                <input type="range" 
                    className="max-range" 
                /> 
            </div> 

        </div>

        <div className='w-full flex justify-between items-center mt-3'>

            <div className='flex justify-start'>
                <input 
                    type="text" 
                    className='w-4/5 px-2 py-1 border-transparent rounded-md bg-white focus:outline-none focus:border-gray-500 focus:ring-0'
                />
            </div>

            <div className='font-bold text-lg'>
                <span> - </span>
            </div>

            <div className='flex justify-end'>
                <input
                    type="text" 
                    className='w-4/5 px-2 py-1 border-transparent rounded-md bg-white focus:outline-none focus:border-gray-500 focus:ring-0'
                />
            </div>

        </div>

    </div>
</>
)
}

export default PriceFilter