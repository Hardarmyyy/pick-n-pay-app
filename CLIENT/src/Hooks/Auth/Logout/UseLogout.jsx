import React from 'react'
import {LOGOUT} from '../../../Services/authApi'
import {useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom';

const UseLogout = () => {

const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = () => {
    dispatch(LOGOUT())
    navigate('/')
}

  return {handleLogout}
}

export default UseLogout