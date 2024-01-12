import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import {FETCHALLCATEGORIES} from "../Services/categoryApi";


export const initialState = {
    status: 'idle',
    allCategories: []
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
                        state.allCategories = state.allCategories.concat(sortedCategories)
                    }
                })
                .addMatcher(
                    isFulfilled(FETCHALLCATEGORIES),
                    (state) => {
                    state.status = 'success'
                }
                )
                .addMatcher(
                    isPending(FETCHALLCATEGORIES),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    isRejected(FETCHALLCATEGORIES),
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