import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETEUSER } from '../../Services/userApi'


const UseDeleteUser = () => {

const id = useSelector((state) => state?.user?.user?.userId)
const dispatch = useDispatch()

const handleDeleteUser = async () => {
    await dispatch(DELETEUSER(id))
}

  return {handleDeleteUser}
}

export default UseDeleteUser