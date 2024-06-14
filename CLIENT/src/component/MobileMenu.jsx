import React from 'react'
import { Link } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

const MobileMenu = ({showCloseSearch, showSearchBar, seller, cart}) => {


return (

<>
    <nav className={'flex justify-between items-center tablet:hidden mini:hidden laptop:hidden super:hidden'}>

        {showSearchBar && <BiSearch onClick={()=> showCloseSearch()} className='text-4xl mr-2 sm:text-2xl md:text-2xl text-gray-500 hover:text-my-primary'></BiSearch>}

        {seller 
            ?  null 
                : 
                    <div className='cursor-pointer relative'>
                        <Link to='/cart'> 
                            {cart?.lenght > 0 && <p className='absolute left-2 -top-2 bg-crimson w-6 h-6 rounded-full text-center text-white font-Montserrat font-bold'>
                                {cart?.length}</p>}
                            <BsCart3 className='text-4xl sm:text-2xl md:text-2xl text-gray-500 hover:text-my-primary'></BsCart3> 
                        </Link>
                    </div>
        }

    </nav>
</>

)
}

export default MobileMenu