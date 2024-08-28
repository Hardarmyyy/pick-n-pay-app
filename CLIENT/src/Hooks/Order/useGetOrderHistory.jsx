import React from 'react'
import { useSelector } from 'react-redux'

const useGetOrderHistory = () => {
    const orderHistory = useSelector((state) => state?.order?.orderHistory)
    const orderStatus = useSelector((state) => state?.order?.status)
    const user = useSelector((state) => state?.user?.user);
    const seller = user && user.userRole[0] === 'seller';
    const buyer = user && user.userRole[0] === 'buyer';

    return {orderHistory, orderStatus, seller, buyer}
}

export default useGetOrderHistory