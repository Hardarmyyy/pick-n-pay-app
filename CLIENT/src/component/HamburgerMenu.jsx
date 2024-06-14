import React from 'react'

const HamburgerMenu = ({showCloseAside}) => {

return (
<>
    <div className='mr-3 tablet:hidden mini:hidden laptop:hidden super:hidden'>

        <button type="button" onClick={() => showCloseAside()} className="inline-flex items-center justify-center p-2 w-8 h-8 text-sm text-gray-500 rounded-lg bg-gray-200 hover:bg-gray-100">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>

    </div>
</>
)
}

export default HamburgerMenu