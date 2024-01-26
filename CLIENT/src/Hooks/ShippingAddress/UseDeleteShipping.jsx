import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETEADDRESS } from '../../Services/addressApi'

const UseDeleteShipping = () => {

const username = useSelector((state) => state.auth?.user?.userName)
const dispatch = useDispatch()

const handleDeleteAddress = async (id) => {
    await dispatch(DELETEADDRESS({id, username}))
}

    return {handleDeleteAddress}

}

export default UseDeleteShipping