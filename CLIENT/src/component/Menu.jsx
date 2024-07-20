import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import UserProfile from './UserProfileCard/UserProfile'
import { BiUserCircle } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BsCart3 } from "react-icons/bs";

const Menu = ({cart, seller, isLoading}) => {

const navRef = useRef(null);

const [active, setActive] = useState(false) 

const handleProfileClick = (e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to the document
};

useEffect(() => {
    const handleDocumentClick = (e) => {
        if (active && navRef.current && !navRef.current.contains(e.target)) {
            setActive(false);
        }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
        document.removeEventListener('click', handleDocumentClick);
    };
}, [active]);

return (

<>
    <nav className={'sm:hidden md:hidden flex justify-between items-center relative'}> 

        {!isLoading && 
            <div  className='sm:hidden md:hidden flex justify-between items-center cursor-pointer p-2 rounded-md tablet:mr-2 mini:mr-6 laptop:mr-8 super:mr-10 bg-gray-200 hover:bg-gray-400' onClick={() => setActive(!active)} ref={navRef}> 

                <BiUserCircle className='text-2xl text-my-primary mr-2'></BiUserCircle>
                <div className='sm:hidden md:hidden flex items-center text-sm'>
                    <span className='mr-1 text-my-primary font-Montserrat'> Account </span> 
                    {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> }
                </div>

            </div>
        }

        {active && <UserProfile onProfileClick={handleProfileClick}></UserProfile>}

        {seller 
            ?  null 
                : 
                    <div className='cursor-pointer relative'>
                        <Link to='/cart'> 
                            {cart?.lenght > 0 && <p className='absolute left-2 -top-2 bg-crimson w-6 h-6 rounded-full text-center text-white font-Montserrat font-bold'>{cart?.length}</p> }
                            <BsCart3 className='text-4xl sm:text-2xl md:text-2xl text-gray-500 hover:text-my-primary'></BsCart3> 
                        </Link>
                    </div>
        }

    </nav>
    
</>

)
}

export default Menu