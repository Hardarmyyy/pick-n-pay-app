import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import UserProfile from '../../component/UserProfileCard/UserProfile'
import { BiUserCircle, BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineClear } from "react-icons/md";
import './Navigation.css'



const Navigation = () => {

const user = useSelector((state) => state.auth.user)

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

    <header className='navigation'> 

        <Logo></Logo>

        <nav className='search'>

            <form className='searchForm'>

                <BiSearch className='searchIcon'></BiSearch>

                <input type='text' placeholder='search for products or brands' name='searchWord' value={word} onChange={handleSearch} className='searchproduct'/>

                {clearResult && <MdOutlineClear onClick={handleClearResult} className='clearIcon'></MdOutlineClear>}

            </form>

            {searchResult.length > 0 &&
                <div className='searchResult'>
                    {searchResult.map((item, index) => 
                        <Link to={`/products/${item}`} key={index}> {item }</Link>
                    )}
                </div>
            } 

        </nav>

        {!user && 
        
            <nav className='userProfile'> 

                <div  className='account' onClick={() => setActive(!active)}> 

                    <BiUserCircle className='userIcon'></BiUserCircle>
                    <span> Account {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> } </span> 

                </div>

                <div className='cartCounter'>
                    <Link to='/checkout'> 
                        <BsCart3 className='cart'></BsCart3> 
                        <p className='counter'> 0 </p>
                    </Link>
                </div>

            </nav>
        }

        {user && user.userRole[0] === 'buyer' && 
            <nav className='userProfile'> 

                <div  className='account' onClick={() => setActive(!active)}> 

                    <BiUserCircle className='userIcon'></BiUserCircle>
                    <span> Account {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> } </span> 

                </div>

                <div className='cartCounter'>
                    <Link to='/checkout'> 
                        <BsCart3 className='cart'></BsCart3> 
                        <p className='counter'> 10 </p>
                    </Link>
                </div>

            </nav>
        }

        {user && user.userRole[0] === 'seller' && 

            <nav className='userProfile seller'> 

                <div  className='account' onClick={() => setActive(!active)}> 

                    <BiUserCircle className='userIcon'></BiUserCircle>
                    <span> Account {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> } </span> 

                </div>

            </nav>
        }   

        {active ? <UserProfile></UserProfile> : null}


    </header>
    
</>
)
}

export default Navigation
