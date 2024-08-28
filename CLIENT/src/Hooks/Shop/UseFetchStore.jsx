import React from 'react'
import { useSelector } from 'react-redux';



const UseFetchStore = () => {

const storeProducts = useSelector((state) => state?.product?.store)
const shopStatus = useSelector((state) => state?.product?.status)

    return {storeProducts, shopStatus}
}

export default UseFetchStore