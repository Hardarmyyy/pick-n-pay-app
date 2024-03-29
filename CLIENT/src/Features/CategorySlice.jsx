import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import {FETCHALLCATEGORIES, CATEGORYPRODUCTS} from "../Services/categoryApi";


export const initialState = {
    status: 'idle',
    allCategories: [],
    categoryProducts: []
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
                        state.allCategories = state.allCategories.concat(categoryData)
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
                    isPending(FETCHALLCATEGORIES, CATEGORYPRODUCTS),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(FETCHALLCATEGORIES, CATEGORYPRODUCTS),
                    (state, action) => {
                        state.status = 'failed';
                        const message = action.payload.error
                        toast.error(message, {
                            toastStyle: { background: 'red', color: 'white' }
                        })
                }
                )
    }
})


export default categorySlice.reducer