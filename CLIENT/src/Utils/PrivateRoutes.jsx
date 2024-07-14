import React from 'react'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import {useSelector} from 'react-redux'



const PrivateRoutes = ({allowedRoles}) => {

const location = useLocation()

const user = useSelector((state) => state?.user?.user)

return (

    user?.userRole.find(role => allowedRoles?.includes(role))
        ? <Outlet></Outlet>
            : user 
                ? <Navigate to='/unauthorized' state={{from: location}} replace></Navigate>
                    : <Navigate to='/login' state={{from: location}} replace></Navigate> 

)
}

export default PrivateRoutes