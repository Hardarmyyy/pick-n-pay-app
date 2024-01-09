import { createSlice } from "@reduxjs/toolkit";
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
                    const {success, error} = action.payload;
                    state.status = 'success'
                    const categories = action.payload.categories
                    if (success) {
                        const sortedCategories = categories.sort((a, b) => a.categoryName > b.categoryName ? 1 : -1);
                        state.allCategories = [...sortedCategories]
                    }
                })
                .addMatcher(
                    (action) => action.type.endsWith('/pending'),
                    (state) => {
                    state.status = 'Loading.......';
                }
                )
                .addMatcher(
                    (action) => action.type.endsWith('/rejected'),
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