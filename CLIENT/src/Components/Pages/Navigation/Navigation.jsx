import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../Utilities/Button'
import '../Navigation/Navigation.css'
import { useState } from 'react'
import { BiUserCircle, BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import UserProfile from './UserProfileCard/UserProfile'
import { useContext } from 'react'
import { myUserContext } from '../../../Utilities/UserContext'



const Navigation = ({ username, cartCounter}) => {

const {user} = useContext(myUserContext)
const {usertype} = user

// define a state to show and hide the useProfile card;
const [active, setActive] = useState(false) 

// define state for search input field;
const [searchWord, setSearchWord] = useState('')

const handleSearch = (e) => {
    setSearchWord(e.target.value)
}

// define a function to handle search form submit
const handleSubmit = (e) => {
    e.preventDefault()
    // setFilteredProducts( searchWord)
    setSearchWord('')
}


return (

<> 
    <nav className='navigation'> 

        <div className='logo'>

            <Link to='/'> <h1> Pick<span className='colored'>N</span>Pay </h1> </Link> 

        </div>

        <div className='search'>

            <form onSubmit={handleSubmit}>

                <BiSearch className='searchIcon'></BiSearch>
                <input type='text' placeholder='search products by brand ' name='searchWord' 
                value={searchWord} onChange={handleSearch} maxLength={35} className='searchproduct'/>

                <Button backgroundColor='crimson' padding='8px 15px'> search</Button>

            </form>

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
                    <div className='cartCounter'>
                        <Link to='/checkout'> <BsCart3 className='cart'></BsCart3> </Link>
                        {cartCounter > 0 && <p className='counter'> {cartCounter} </p>}
                    </div>
                : null}
            </div>

        }

        {active ? <UserProfile></UserProfile> : null}

    </nav>
</>
)
}

export default Navigation
