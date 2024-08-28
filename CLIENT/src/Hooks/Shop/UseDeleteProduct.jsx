import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETEPRODUCT } from '../../Services/productAPi'


const UseDeleteProduct = () => {

const username = useSelector((state) => state?.user?.user?.username)
const dispatch = useDispatch()

const handleDeleteproduct = async (id) => {
    await dispatch(DELETEPRODUCT({id, username}))
}

  return {handleDeleteproduct}
}

export default UseDeleteProduct