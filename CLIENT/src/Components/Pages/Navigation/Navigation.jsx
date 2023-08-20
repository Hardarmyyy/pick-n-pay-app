import { Link } from 'react-router-dom'
import '../Navigation/Navigation.css'
import { useState, useContext } from 'react'
import { BiUserCircle, BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import UserProfile from './UserProfileCard/UserProfile'
import { myUserContext } from '../../../Utilities/UserContext'
import { MdOutlineClear } from "react-icons/md";
import { myProductContext } from '../../../Utilities/ProductContext'



const Navigation = ({ username, cartCounter}) => {

const {user} = useContext(myUserContext)
const {usertype} = user

const {foundBrands} = useContext(myProductContext)

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
    <nav className='navigation'> 

        <div className='logo'>

            <Link to='/'> <h1> Pick<span className='colored'>N</span>Pay </h1> </Link> 

        </div>

        <div className='search'>

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

        </div>

        {username === null ?  

            <div className='userProfile'> 

                <div  className='account' onClick={() => setActive(!active)}> 
                    <BiUserCircle className='userIcon'></BiUserCircle>
                    <span> Account {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> } </span> 
                </div>

                <div className='cartCounter'>
                    <Link to='/checkout'> <BsCart3 className='cart'></BsCart3> </Link>
                    {cartCounter > 0 && <p className='counter'> {cartCounter} </p>}
                </div>

            </div>
        
        : 

            <div className='userProfile' > 

                <div  className='account' onClick={() => setActive(!active)}> 
                    <BiUserCircle className='userIcon'></BiUserCircle>
                    <span> Account {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> } </span> 
                </div>
                {usertype === 'buyer' ? 
                    <Link to='/checkout'>
                        <div className='cartCounter'>
                            <BsCart3 className='cart'></BsCart3> 
                            {cartCounter > 0 && <p className='counter'> {cartCounter} </p>}
                        </div>
                    </Link>
                : null}
            </div>

        }

        {active ? <UserProfile></UserProfile> : null}

    </nav>
</>
)
}

export default Navigation
