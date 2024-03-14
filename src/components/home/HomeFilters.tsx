import { LoadingButton } from "@mui/lab";
import { Button, FormControl, MenuItem, Select, Stack, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../models/Product";
import { RootState } from "../../store";
import { setCategory } from "../../store/slices/categorySlice";
import { setProducts } from "../../store/slices/productsSlice";
import ClearButton from "../common/ClearButton";

export default function HomeFiters({ runReport }: any): JSX.Element {

    const dispatch = useDispatch();

    const selectedCategory = useSelector<RootState>((state) => state.category) as string;
    const selectedProducts = useSelector<RootState>((state) => state.products) as number[];

    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [productOptions, setProductOptions] = useState<Product[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Fetches categories on component mount.
     */
    useEffect((): void => {
        axios.get('/products/categories').then((resp: AxiosResponse<string[]>) => setCategoryOptions(resp.data));
    }, []);

    /**
     * Fetch products list on category chnages.
     */
    useEffect((): void => {
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
    const clearFiltersHandler = (): void => {
        dispatch(setCategory('')); // Clear Selected Category.
        dispatch(setProducts([])); // Clear Selected Product.
        runReport([], ''); // Remove Charts by clearing products data.
    };

    /**
     * Handle Clear Category Selection
     */
    const clearCategoryHandler = (): void => {
        dispatch(setCategory('')); // Clear Selected Category.
        runReport([], ''); // Remove Charts by clearing products data.
    };

    /**
     * Handle Clear Product Selection
     */
    const clearProductHandler = (): void => {
        dispatch(setProducts([])); // Clear Selected Product.
    };

    /**
     * Filter Products to be shown in Chart based on selected Products in Dropdown.
     * @returns 
     */
    const filterSelectedProducts = (): Product[] => {
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
    const runReportHandler = (): void => {
        setLoading(true);
        setTimeout(() => {
            runReport(filterSelectedProducts(), selectedCategory);
            setLoading(false);
        }, 3000);
    };

    const renderCategoryValue = (value: string): string => value ? value : 'Select Category';

    const renderProductValues = (values: number[]): string => {
        if (values?.length > 0) {
            let displayText: string = '';
            const product = productOptions.filter((product: Product) => values.includes(product.id))[0] as Product;
            displayText += product.title;
            if (values?.length > 1) {
                displayText += ` +${values.length - 1} others`;
            }
            return displayText;
        }
        return 'Select Product';
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
                    <Select
                        value={selectedCategory}
                        onChange={(event) => dispatch(setCategory(event.target.value))}
                        displayEmpty renderValue={renderCategoryValue}
                        endAdornment={<ClearButton onClick={clearCategoryHandler} />}
                    >
                        {categoryOptions.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl fullWidth disabled={isCategoryNotSelected}>
                    <Select multiple
                        value={selectedProducts}
                        onChange={(event) => dispatch(setProducts(event.target.value as number[]))}
                        disabled={isCategoryNotSelected}
                        displayEmpty renderValue={renderProductValues}
                        endAdornment={<ClearButton onClick={clearProductHandler} disabled={isCategoryNotSelected} />}
                    >
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