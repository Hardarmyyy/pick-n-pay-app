import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import Aside from '../../component/Aside'
import MobileSearchInput from '../../component/MobileSearchInput'
import MobileMenu from '../../component/MobileMenu'
import Menu from '../../component/Menu'
import HamburgerMenu from '../../component/HamburgerMenu'
import { MdOutlineClear } from "react-icons/md";
import { BiSearch } from "react-icons/bi";



const Navigation = ({category, isLoading}) => {

const user = useSelector((state) => state?.user?.user);
const cart = useSelector((state) => state?.cart?.cartItems);
const location = useLocation();
const showSearchBar = location.pathname === '/' || location.pathname === `/category/${category}`
const seller = user && user.userRole[0] === 'seller';
const buyer = user && user.userRole[0] === 'buyer';

const [showAsideMenu, setShowAsideMenu] = useState(false)  
const [showDropDown, setShowDropDown] = useState(false)
const [showMobileSearch, setShowMobileSearch] = useState(false)


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
    <header className='w-full tablet:mt-4 mini:mt-4 laptop:mt-4 super:mt-4 sm:p-2 md:p-2 tablet:px-4 mini:px-6 laptop:px-6 super:px-60 flex justify-between items-center border-b tablet:pb-4 mini:pb-4 laptop:pb-4 super:pb-4 sticky top-0 right-0 z-40 bg-white'> 
        <div className='flex items-center'>

            <HamburgerMenu isLoading={isLoading}  showCloseAside={() => setShowAsideMenu(!showAsideMenu)}></HamburgerMenu>

            <Logo></Logo>

        </div>

        {showSearchBar && 

            <form className='sm:hidden md:hidden tablet:w-1/2 mini:w-1/2 laptop:w-1/2 super:w-1/2 block relative'>

                <BiSearch className='absolute left-5 top-3 text-slate-500'></BiSearch>

                <input className='w-full px-10 py-2 bg-white border rounded-md text-sm text-my-primary font-Montserrat shadow-sm placeholder:italic placeholder:text-slate-400 focus:outline-none focus: border-slate-500' type='text' placeholder='search for products or brands' name='searchWord' value={word} onChange={handleSearch} maxLength={35}/>

                {clearResult && <MdOutlineClear onClick={handleClearResult} className=''></MdOutlineClear>}

            </form>

        }

        <Menu cart={cart} seller={seller} isLoading={isLoading}></Menu>

        <MobileMenu showCloseSearch={()=> setShowMobileSearch(!showMobileSearch)} showSearchBar={showSearchBar} seller={seller} cart={cart}></MobileMenu>

        {showAsideMenu && <Aside showDropDown={showDropDown} showCloseAside={()=> setShowAsideMenu(!showAsideMenu)} showCloseDropDown={() => setShowDropDown(!showDropDown)} buyer={buyer} seller={seller} user={user}></Aside>}

        {showMobileSearch && <MobileSearchInput showCloseSearch={() => setShowMobileSearch(!showMobileSearch)}></MobileSearchInput>}

    </header>
    
</>
)
}

export default Navigation
