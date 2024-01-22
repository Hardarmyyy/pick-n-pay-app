import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import UserProfile from '../../component/UserProfileCard/UserProfile'
import { BiUserCircle, BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineClear } from "react-icons/md";



const Navigation = () => {

const user = useSelector((state) => state?.auth?.user);
const cart = useSelector((state) => state?.cart?.cartItems);
const location = useLocation();
const showSearchBar = location.pathname === '/'
const seller = user && user.userRole[0] === 'seller';
const buyer = user && user.userRole[0] === 'buyer';

// define a state to show and hide the useProfile card;
const [active, setActive] = useState(false)   

// define state for search input field;
const [searchResult, setSearchResult] = useState([]) 
const [word, setWord] = useState('')
const [clearResult, setClearResult] = useState(false)

const handleSearch = (e) => {
    const searchWord = e.target.value
    setWord(searchWord)
    const updatedSearch = foundBrands.filter((item) => item.toLowerCase().includes(searchWord.toLowerCase()))
    if (searchWord === '') {
        setSearchResult([])
        setClearResult(false)
    }
    else {
        setClearResult(true)
        setSearchResult(updatedSearch)
    }
}

const handleClearResult = () => {
    setSearchResult([])
    setWord('')
    setClearResult(false)
}

return (

<> 

    <header className='min-w-full my-4 px-4 flex justify-between items-center border-b pb-4'> 

        <Logo></Logo>

        {showSearchBar && 

            <form className='w-1/2 block relative'>

                <BiSearch className='absolute left-5 top-3 text-slate-500'></BiSearch>

                <input className='w-full px-10 py-2 bg-white border rounded-md text-sm text-my-primary font-Montserrat shadow-sm placeholder:italic placeholder:text-slate-400 focus:outline-none focus: border-slate-500' type='text' placeholder='search for products or brands' name='searchWord' value={word} onChange={handleSearch} maxLength={35}/>

                {clearResult && <MdOutlineClear onClick={handleClearResult} className=''></MdOutlineClear>}

            </form>

            // {/* {searchResult.length > 0 &&
            //     <div className='searchResult'>
            //         {searchResult.map((item, index) => 
            //             <Link to={`/products/${item}`} key={index}> {item }</Link>
            //         )}
            //     </div>
            // }  */}

        }

        <nav className={'flex justify-between items-center relative'}> 

            <div  className='flex justify-between items-center cursor-pointer p-2 rounded-md mr-11 md:mr-5 lg:mr-7 xl:mr-9 bg-gray-200 hover:bg-gray-400' onClick={() => setActive(!active)}> 

                <BiUserCircle className='text-2xl text-my-primary mr-2'></BiUserCircle>
                <div className='flex items-center text-sm'>
                    <span className='mr-1 text-my-primary font-Montserrat'> Account </span> 
                    {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> }
                </div>

            </div>

            {active && <UserProfile></UserProfile>}

            {seller 
                ?  null 
                    : 
                        <div className='cursor-pointer relative'>
                            <Link to='/cart'> 
                                {cart?.lenght > 0 && <p className='absolute left-2 -top-2 bg-crimson w-6 h-6 rounded-full text-center text-white font-Montserrat font-bold'>{cart?.length}</p> }
                                <BsCart3 className='text-4xl text-gray-500 hover:text-my-primary'></BsCart3> 
                            </Link>
                        </div>
            }

        </nav>

    </header>
    
</>
)
}

export default Navigation
