import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETEUSER } from '../../Services/userApi'
import { OPENMODAL } from '../../Features/UserSlice';



const UseDeleteUser = () => {


const id = useSelector((state) => state?.user?.user?.userId)
const isOpenModal = useSelector((state) => state?.user?.isDelete)
const dispatch = useDispatch();

const handleDeleteUser = async () => {
    await dispatch(DELETEUSER(id))
}

// define a function to open modal 
const handleOpenModal = () => { 
  dispatch(OPENMODAL());
}

  return {isOpenModal, handleDeleteUser, handleOpenModal}
}

export default UseDeleteUser