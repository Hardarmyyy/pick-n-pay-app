import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SWICTHPROFILE } from '../../Services/userApi'
import {toast} from 'react-toastify'

const UseSwicthProfile = () => {

const id = useSelector((state) => state?.user?.user?.userId)
const dispatch = useDispatch()
const navigate = useNavigate()

const handleSwicthProfile = async () => {
    await dispatch(SWICTHPROFILE(id))
    .then((response) => {
        if (response.payload.message) {
          setTimeout(() => {
            navigate('/profile')
          }, 2500)
        }
    })
    .catch((err) => {
      toast.error('Something went wrong', {
        toastStyle: { background: 'red', color: 'white' }
      })
    })
}

  return {handleSwicthProfile}
}

export default UseSwicthProfile