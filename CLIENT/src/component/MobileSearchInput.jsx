import React from 'react'
import { BiSearch } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

const MobileSearchInput = ({showCloseSearch}) => {

return (
<>
    <aside className="fixed bg-my-bg-primary w-full top-0 left-0 z-50 h-screen transition-transform tablet:hidden mini:hidden laptop:hidden super:hidden">
        <div className="w-full h-12 overflow-y-auto bg-[#dddbdb] z-50 sticky top-0 right-0">

            <form className='w-full relative px-2 flex justify-between items-center bg-white'>   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            
                <BsArrowLeftShort onClick={()=> showCloseSearch()} className='text-slate-500 text-4xl pr-1 flex-shrink-0'></BsArrowLeftShort>
                
                <input className='w-full h-12 p-2 flex-1 bg-white border-none outline-none text-md text-my-primary font-Montserrat shadow-sm placeholder:italic placeholder:text-slate-400 focus:outline-none' type='text' placeholder='Search for products or brands' name='searchWord' value={{}} onChange={{}} maxLength={25}/>
                
                <BiSearch className='text-slate-500 text-4xl pl-2 flex-shrink-0'></BiSearch>
                
            </form>

        </div>
    </aside>
</>
)
}

export default MobileSearchInput