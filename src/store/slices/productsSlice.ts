import { createSlice } from "@reduxjs/toolkit";
import Product from "../../models/Product";

const productsSlice = createSlice({
    name: 'category',
    initialState: [] as Product[],
    reducers: {
        setProducts: (_state, action) => {
            return action.payload;
        },
        clearProducts: () => {
            return [] as Product[];
        }
    }
});

export const { setProducts, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;