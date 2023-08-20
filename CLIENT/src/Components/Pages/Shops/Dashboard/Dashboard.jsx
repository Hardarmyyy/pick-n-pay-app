import React from 'react'
import { useContext } from 'react'
import { myUserContext } from '../../../../Utilities/UserContext'
import '../Dashboard/Dashboard.css'
import { BsCart3 } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi"
import { FaSitemap } from "react-icons/fa"
import { BiCoinStack } from "react-icons/bi";



const Dashboard = () => {


const {shopItems, isLoading} = useContext(myUserContext)

const productsInStock = shopItems?.reduce((total, item) => total + item.stockQty, 0)

return (

<>
    <section className='sellerDashboard'>

        <p className='shopStats'> Shop statistics </p>

        {isLoading && <p className='dashBoardLoader'> Loading .... </p>}

        {!isLoading && 

            <div className='dashboard'>

                <div className='customerAndOrders'>
                    <div className='pendingOrders'>
                        <p> Pending Orders </p>
                        <div className='pendingOrderContainer'>
                            <BsCart3 className='dashboardIcon'></BsCart3> 
                            <p> - </p>
                        </div>
                    </div>

                    <div className='customers'>
                        <p> Customers </p>
                        <div className='customerConatiner'>
                            <BiUserCircle className='dashboardIcon'></BiUserCircle>
                            <p> - </p>
                        </div>
                    </div>
                </div>

                <div className='stocksRevenue'>
                    <div className='stockProducts'>
                        <p> Products in stocks </p>
                        <div className='stocksContainer'>
                            <FaSitemap className='dashboardIcon'></FaSitemap>
                            <p> {productsInStock} </p>
                        </div>
                    </div>

                    <div className='revenue'>
                        <p> Total sales </p>
                        <div className='salesContainer'>
                            <BiCoinStack className='dashboardIcon'></BiCoinStack> 
                            <p> - </p>
                        </div>
                    </div>
                </div>

            </div>
        }
        
    </section>
</>

)
}

export default Dashboard