import React from 'react'
import {LOGOUT} from '../../../Services/authApi'
import {useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom';

const UseLogout = () => {

const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async () => {
    dispatch(LOGOUT())
    .then((response) => {
      if (response.payload.message) {
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