import React from 'react'
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { Link } from 'react-router-dom'
import UserProfile from '../../../Navigation/UserProfileCard/UserProfile';
import { useState } from 'react';
import '../SuccessForm/SuccessForm.css';

const SuccessForm = () => {


// define a state to show and hide the useProfile card;
const [active, setActive] = useState(false) 

return (

<>
    <nav className='navigation'> 

    <div className='logo'>

        <Link to='/'> <h1> Pick<span className='colored'>N</span>Pay </h1> </Link> 

    </div>

    <div className='userProfile' > 
            <div  className='account' onClick={() => setActive(!active)}> 
                <BiUserCircle className='userIcon'></BiUserCircle>
                <span> Account {active ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown> } </span> 
            </div>
    </div>

    {active ? <UserProfile></UserProfile> : null}

    </nav>

    <section className='successContainer'>

        <p> product has been added succesfully</p>
        <Link to='/shop'> back to shop </Link>

    </section>
</>
)
}

export default SuccessForm