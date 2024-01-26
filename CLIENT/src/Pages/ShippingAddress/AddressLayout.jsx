import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FETCHADDRESSLIST } from '../../Services/addressApi';
import { Outlet } from 'react-router-dom'
import Navigation from '../../Layouts/Navigation/Navigation'
import { ToastContainer } from 'react-toastify'

const AddressLayout = () => {

const dispatch = useDispatch()
const userId = useSelector((state) => state.auth?.user?.userID)

useEffect(() => {
    dispatch(FETCHADDRESSLIST(userId))
}, [dispatch]);

  return (

    <>
        <ToastContainer 
            position='top-right'
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
        />
        
        <Navigation></Navigation>
        <Outlet></Outlet>
    </>
  )
}

export default AddressLayout