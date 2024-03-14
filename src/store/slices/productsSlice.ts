import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'category',
    initialState: [] as number[],
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        }
    }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;