import { LoadingButton } from "@mui/lab";
import { Button, FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../models/Product";
import { RootState } from "../../store";
import { setCategory } from "../../store/slices/categorySlice";
import { setProducts } from "../../store/slices/productsSlice";

export default function HomeFiters({ runReport }: any) {

    const dispatch = useDispatch();

    const selectedCategory = useSelector<RootState>((state) => state.category) as string;
    const selectedProducts = useSelector<RootState>((state) => state.products) as number[];

    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [productOptions, setProductOptions] = useState<Product[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Fetches categories on component mount.
     */
    useEffect(() => {
        axios.get('/products/categories').then((resp: AxiosResponse<string[]>) => setCategoryOptions(resp.data));
    }, []);

    /**
     * Fetch products list on category chnages.
     */
    useEffect(() => {
        if (selectedCategory) {
            dispatch(setProducts([]));
            axios.get(`/products/category/${selectedCategory}`).then((resp: AxiosResponse<any>) => setProductOptions(resp.data?.products ?? []));
        } else {
            setProductOptions([]);
        }
    }, [dispatch, selectedCategory]);

    /**
     * Handle clear button actions
     */
    const clearFiltersHandler = () => {
        dispatch(setCategory('')); // Clear Selected Category.
        dispatch(setProducts([])); // Clear Selected Product.
        runReport([], ''); // Remove Charts by clearing products data.
    };

    /**
     * Filter Products to be shown in Chart based on selected Products in Dropdown.
     * @returns 
     */
    const filterSelectedProducts = () => {
        console.log('selectedProducts', selectedProducts);
        if (selectedProducts.length === 0) {
            return [...productOptions];
        }
        else if (selectedProducts?.length >= 4) {
            return productOptions.filter((product: Product) => selectedProducts.includes(product.id));
        }
        return [];
    };

    /**
     * Shows Loader in Button for 3s and displays report.
     */
    const runReportHandler = () => {
        setLoading(true);
        setTimeout(() => {
            runReport(filterSelectedProducts(), selectedCategory);
            setLoading(false);
        }, 3000);
    };

    const isCategoryNotSelected = !selectedCategory; // Flag to check if category is not selected

    return (
        <Stack gap={3} padding={3} flexGrow={1} sx={{ borderStyle: 'solid' }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h5">Filters</Typography>
                <Button variant="text" onClick={clearFiltersHandler}>Clear</Button>
            </Stack>
            <Stack rowGap={3}>
                <FormControl fullWidth>
                    <Select value={selectedCategory} onChange={(event) => dispatch(setCategory(event.target.value))} placeholder="Select Category">
                        {categoryOptions.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl fullWidth disabled={isCategoryNotSelected}>
                    <Select multiple value={selectedProducts} onChange={(event) => dispatch(setProducts(event.target.value as number[]))} disabled={isCategoryNotSelected}>
                        {productOptions.map(option => (<MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>))}
                    </Select>
                </FormControl>
            </Stack>
            <LoadingButton size="large" sx={{ mt: 'auto' }} onClick={runReportHandler} loading={loading} variant="contained" disabled={isCategoryNotSelected} color="primary">
                Run Report
            </LoadingButton>
        </Stack>
    );
}