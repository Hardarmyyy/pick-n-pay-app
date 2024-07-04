import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import {FETCHALLCATEGORIES, CATEGORYPRODUCTS} from "../Services/categoryApi";
import {toast} from 'react-toastify'


export const initialState = {
    status: 'idle',
    allCategories: null,
    categoryProducts: null
}

export const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers: {
    
    },
    extraReducers (builder) {
        builder 
                .addCase(FETCHALLCATEGORIES.fulfilled, (state, action) => { 
                    const categories = action.payload.categories
                    if (categories) {
                        const sortedCategories = categories.sort((a, b) => a.categoryName > b.categoryName ? 1 : -1);
                        const categoryData = sortedCategories.map((category) => {return {categoryID: category._id, category: category.categoryName} })
                        state.allCategories = categoryData
                    }
                })
                .addCase(CATEGORYPRODUCTS.fulfilled, (state, action) => { 
                    const {success, categoryProducts} = action.payload
                    if (success) {
                        state.categoryProducts = [...categoryProducts]
                    }
                })
                .addMatcher(
                    isFulfilled(FETCHALLCATEGORIES, CATEGORYPRODUCTS),
                    (state) => {
                    state.status = 'success'
                }
                )
                .addMatcher(
                    isPending(CATEGORYPRODUCTS),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(CATEGORYPRODUCTS),
                    (state, action) => {
                        state.status = 'failed';
                        const err = action.payload.error
                        toast.error(err, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                }
                )
    }
})


export default categorySlice.reducer