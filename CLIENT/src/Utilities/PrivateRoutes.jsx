import { Navigate, Outlet } from "react-router-dom";
import React from 'react'
import { useContext } from "react";
import { myUserContext } from "./UserContext";

const PrivatesRoutes = () => {

//import user from myUserContext and destructure auth;

const {user} = useContext(myUserContext)
const {usertype} = user

return (

    usertype === null ? <Navigate to='/login' replace></Navigate> : <Outlet></Outlet> 

)
}

export default PrivatesRoutes
