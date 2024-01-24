import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DELETEPRODUCT } from '../../Services/productAPi'


const UseDeleteProduct = () => {

const username = useSelector((state) => state.auth?.user?.userName)
const dispatch = useDispatch()
const navigate = useNavigate()

const handleDeleteproduct = async (id) => {
    await dispatch(DELETEPRODUCT({id, username}))
}

  return {handleDeleteproduct}
}

export default UseDeleteProduct