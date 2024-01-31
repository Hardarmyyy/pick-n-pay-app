import React from 'react'
import { useSelector } from 'react-redux';
import { BsCart3 } from "react-icons/bs";
import { FaSitemap } from "react-icons/fa"
import { BiCoinStack } from "react-icons/bi";


const Dashboard = () => {

const storeProducts = useSelector((state) => state.product?.store)


  return (
    <>
      <section className='w-1/2 px-10 py-4 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto translate-y-0'>

        <p className='text-center mb-2 font-bold font-Jost md:text-xl lg:text-2xl'> Shop statistics </p>

        <div className='grid grid-rows-2 grid-cols-4 gap-4 text-lg text-my-primary font-Montserrat'> 

            <div className='w-full h-36 px-2 py-4 flex flex-col justify-center items-center grid-cols-1 col-span-4 grid-rows-1 text-center border bg-gray-200 rounded-md shadow-sm'>
                <BiCoinStack className='text-4xl mb-2'></BiCoinStack>
                <p> Total sales </p>
                <p> - </p>
            </div>

            <div className='w-full h-36 px-2 py-4 flex flex-col justify-center items-center grid-rows-2 grid-cols-1 col-span-2 border text-center bg-gray-200 rounded-md shadow-sm'>
                <BsCart3 className='text-4xl mb-2'></BsCart3> 
                <p> Pending Orders </p>
                <p> - </p>
            </div>

            <div className='w-full h-36 px-2 py-4 flex flex-col justify-center items-center grid-rows-2 grid-cols-2 col-span-2 border text-center bg-gray-200 rounded-md shadow-sm'>
                <FaSitemap className='text-4xl mb-2'></FaSitemap>
                <p> Products in stocks </p>
                {storeProducts.length > 0 ? <p> {storeProducts?.length} </p> : <p> - </p>}
            </div>

        </div>

      </section>
    </>
  )
}

export default Dashboard