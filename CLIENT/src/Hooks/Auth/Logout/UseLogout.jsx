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
        navigate('/')
    }
})
}


const handleMobileLogout = async (closeAside) => {
    dispatch(LOGOUT())
    .then((response) => {
      if (response.payload.message) {
        closeAside()
        navigate('/')
      }
  })
}

const handlePasswordLogout = () => {
    dispatch(LOGOUT())
    .then((response) => {
      if (response.payload.message) {
        navigate('/login')
      }
  })
}

  return {handleLogout, handleMobileLogout, handlePasswordLogout}
}

export default UseLogout