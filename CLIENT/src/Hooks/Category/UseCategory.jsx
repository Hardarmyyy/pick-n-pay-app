import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {CATEGORYPRODUCTS} from '../../Services/categoryApi'


const UseCategory = (category) => {

    const dispatch = useDispatch()
    const categoryProducts = useSelector((state) => state?.category?.categoryProducts)
    const categoryStatus = useSelector((state) => state?.category?.status)

    useEffect(() => {
        dispatch(CATEGORYPRODUCTS(category))
    }, [category])

    return {categoryProducts, categoryStatus}
}

export default UseCategory