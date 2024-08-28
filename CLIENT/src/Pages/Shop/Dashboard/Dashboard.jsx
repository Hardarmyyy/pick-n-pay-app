import React from 'react'
import { BsCart3 } from "react-icons/bs";
import { FaSitemap } from "react-icons/fa"
import { BiCoinStack } from "react-icons/bi";
import UseFetchStore from '../../../Hooks/Shop/UseFetchStore';

const Dashboard = () => {

const {shopStatus, storeProducts} = UseFetchStore(); 

  return (
    <>
      <section className='w-full tablet:w-3/4 mini:w-3/5 laptop:w-1/2 super:w-3/5 mx-auto'>

        <p className='font-Jost text-lg tablet:text-xl mini:text-2xl laptop:text-3xl super:text-3xl mb-2 text-blue-950 font-bold text-center'> Shop statistics </p>

        {shopStatus === 'Loading...' 
        
        ?
            <div className='grid grid-rows-2 grid-cols-4 gap-4'> 

              <div className='w-full h-36 px-2 py-4 flex flex-col justify-center grid-cols-1 col-span-4 grid-rows-1 bg-gray-200 animate-pulse shadow-xl rounded-lg border'></div>
              <div className='w-full h-36 px-2 py-4 flex flex-col justify-center items-center grid-rows-2 grid-cols-1 col-span-2 bg-gray-200 animate-pulse shadow-xl rounded-lg border'></div>
              <div className='w-full h-36 px-2 py-4 flex flex-col justify-center items-center grid-rows-2 grid-cols-1 col-span-2 bg-gray-200 animate-pulse shadow-xl rounded-lg border'></div>

            </div>
        :
          
          <div className='grid grid-rows-2 grid-cols-4 gap-4 text-lg text-my-primary font-bold font-Montserrat'> 

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
                  {storeProducts && storeProducts.length > 0 ? <p> {storeProducts?.length} </p> : <p> - </p>}
              </div>

          </div>
        }

      </section>
    </>
  )
}

export default Dashboard