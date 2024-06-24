import React from 'react'
import {useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { BsBox2, BsBagHeart } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import Logo from '../Layouts/Logo/Logo';
import Categories from './Categories/Categories';
import AsideNewsLetter from '../Layouts/NewsLetter/AsideNewsLetter';
import UseLogout from '../Hooks/Auth/Logout/UseLogout';

const Aside = ({showDropDown, showCloseAside, showCloseDropDown, buyer, user}) => {

const accessToken = useSelector((state) => state.auth?.accessToken);

const {handleLogout} = UseLogout()

const handleSignOut = async () => {
    await handleLogout()
    showCloseAside()
}

const handlecloseAsideAndCloseDropDown = () => {
    showCloseAside()
    showCloseDropDown()
}


return (
    <>
        <aside className="fixed bg-my-bg-primary w-full top-0 left-0 z-50 h-screen transition-transform tablet:hidden mini:hidden laptop:hidden super:hidden">

            <div className="sm:w-3/4 md:w-1/2 h-screen overflow-y-auto bg-[#dddbdb]">

                <div className='flex items-center border-b border-gray-400 p-2'>
                    <button type="button" onClick={() => showCloseAside()} className="inline-flex items-center p-2 w-8 h-8 mr-3 text-sm text-gray-500 rounded-lg transition duration-75 bg-gray-200 hover:bg-gray-100">
                            <span className="sr-only"> Close sidebar </span>
                            <svg className="w-8 h-8"  aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                    </button>
                    <Logo></Logo>
                </div>

                <ul className="space-y-2 font-medium p-2">

                    {user && <p className='my-1 flex justify-start pl-11 items-center font-medium'> Hi  <span className='font-bold ml-3'> {user.userName} </span> </p> }

                    <li>
                        <button type="button" onClick={() => showCloseDropDown()} className="flex items-center w-full p-2 text-base transition duration-75">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                            </svg>
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"> Categories </span>
                            {showDropDown
                                    ?
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5L5 1L9 5"/>
                                    </svg>
                                        :
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                            </svg>
                            }
                        </button>
                        {showDropDown &&
                            <ul className="px-9 space-y-2">
                                <div className='pl-2'>
                                    <Categories eventHandler={() => handlecloseAsideAndCloseDropDown()}></Categories>
                                </div>
                            </ul>
                        }
                    </li>

                    <li>
                        <Link to='/profile' className="flex items-center p-2">
                            <BiUserCircle className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75'></BiUserCircle>
                            <span className="flex-1 ms-3 whitespace-nowrap"> Account </span>
                        </Link>
                    </li>

                    <li>
                        <Link to='/orders' className="flex items-center p-2">
                            <BsBox2 className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75'></BsBox2>
                            <span className="flex-1 ms-3 whitespace-nowrap"> Orders </span>
                        </Link>
                    </li>

                    <li>
                        { buyer 
                            ?
                                <Link to='/favourites' className="flex items-center p-2">
                                    <BsBagHeart className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75'></BsBagHeart>
                                    <span className="flex-1 ms-3 whitespace-nowrap"> Wishlist {buyer ? <span> 10 </span> : null} </span>
                                </Link>

                                :

                                    <Link to='/shop' className='flex items-center p-2'> 
                                        <RxDashboard className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75'></RxDashboard> 
                                        <span className='flex-1 ms-3 whitespace-nowrap'> Shop </span>
                                    </Link> 
                        }
                    </li>

                    {accessToken 

                        ? 
                            <button className="flex items-center p-2" onClick={() => handleSignOut()}>
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                            </button>
                            :

                                <>

                                    <li>
                                        <Link to='/login' className="flex items-center p-2">
                                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to='/signup' className="flex items-center p-2">
                                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                                                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                                        </Link>
                                    </li>

                                </>
                    }

                </ul>
                
                <div className='p-3'>
                    <div className="sm:px-2 py-4 rounded-lg bg-blue-400">
                        <AsideNewsLetter></AsideNewsLetter>
                    </div>
                </div>

            </div>

        </aside>
    </>
)
}

export default Aside