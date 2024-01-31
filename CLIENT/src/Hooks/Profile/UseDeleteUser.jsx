import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETEUSER } from '../../Services/userApi'
import UseLogout from '../../Hooks/Auth/Logout/UseLogout'
import {toast} from 'react-toastify'

const UseDeleteUser = () => {

const id = useSelector((state) => state?.auth?.user?.userID)
const dispatch = useDispatch()
const {handleLogout} = UseLogout()

const handleDeleteUser = async () => {
    await dispatch(DELETEUSER(id))
    .then((response) => {
      if (response.payload.message) {
        setTimeout(() => {
          handleLogout()
        }, 2500)
      }
    })
    .catch((err) => {
      toast.error('Something went wrong', {
        toastStyle: { background: 'red', color: 'white' }
      })
    })
}

  return {handleDeleteUser}
}

export default UseDeleteUser