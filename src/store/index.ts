import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './slices/categorySlice';
import productsReucer from './slices/productsSlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        products: productsReucer
    }
});

export type RootState = ReturnType<typeof store.getState>

