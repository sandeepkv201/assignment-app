import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: '',
    reducers: {
        setCategory: (_state, action) => {
            return action.payload;
        },
        clearCategory: () => {
            return '';
        }
    }
});

export const { setCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;