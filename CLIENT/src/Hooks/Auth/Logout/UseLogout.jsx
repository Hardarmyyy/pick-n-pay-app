import React from 'react'
import {LOGOUT} from '../../../Services/authApi'
import {useDispatch } from 'react-redux'
import {useNavigate, useLocation } from 'react-router-dom';

const UseLogout = () => {

const dispatch = useDispatch();
const navigate = useNavigate();


const handleLogout = async (closeAside) => {
    dispatch(LOGOUT())
    .then((response) => {
      if (response.payload.message) {
        closeAside()
        setTimeout(() => {
          navigate('/')
        }, 2500) 
      }
  })
}

// const handleLogoutforPassword = () => {
//     dispatch(LOGOUT())
//     navigate('/login')
// }

  return {handleLogout}
}

export default UseLogout