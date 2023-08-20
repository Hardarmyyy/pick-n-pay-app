import React from 'react'
import { AiFillDelete } from "react-icons/ai";
import { LuEdit } from "react-icons/lu";
import { Link } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { useState, useContext } from 'react';
import UserProfile from '../../Navigation/UserProfileCard/UserProfile';
import { myUserContext } from '../../../../Utilities/UserContext';



const Store = () => {

// define a state to show and hide the useProfile card;
const [active, setActive] = useState(false)  

// destructure username from myUserContext;
const {user, deleteProduct, shopItems, message, isLoading} = useContext(myUserContext)
const {username} = user


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

    <section className='shop'>
        {message && <p className='productDeletedMessage'> {message} </p>}

        <div className='shopLinks'>
            <Link to='/post-product'> <p> Add new product </p>  </Link>
            <Link to='/shop/all-products'> <p> All products </p> </Link>
        </div>

        {isLoading && <p className='shopLoader'> Loading .... </p>}

        {!isLoading &&

        <div className='productsShelve'>
            
            <table className='productsTableList'>

                <thead>
                    <tr className='activeShelve'>
                        <th> Product ID </th>
                        <th> Title </th>
                        <th className='price'> Price </th>
                        <th className='category'> Category </th>
                        <th className='stockQty'> Stock Qty </th>
                        <th>  </th>
                        <th>  </th>
                    </tr>
                </thead>

            
                {shopItems && shopItems.length > 0 ?
                    <tbody>
                        {shopItems.map((item) => (
                            <tr key={item.productID} className='activeShelve'>
                                <td className='id'>ID: {item.productID} </td>
                                <td className='title'> {item.title} </td>
                                <td className='price'> $ {item.price} </td>
                                <td className='category'> {item.category} </td>
                                {item.stockQty > 0 ? <td className='stockQty'> {item.stockQty} </td> : <td className='stockQty'> - </td>}
                                <td className='deleteProduct' onClick={() => deleteProduct(item.productID)}> <AiFillDelete className='deleteIcon'></AiFillDelete></td>
                                <td className='editProduct'> <Link to={`/update-product/${item.productID}`}> <LuEdit className='icon'></LuEdit> </Link> </td>
                            </tr>
                        ))}
                    </tbody>
                :
                    <tbody>
                        <tr>
                            <td className='emptyShelve' colSpan={5}> You currently have no product on the shelf  </td>
                        </tr>
                    </tbody>
                }
                    
            </table>

        </div>
        }

    </section>
</>
)
}

export default Store