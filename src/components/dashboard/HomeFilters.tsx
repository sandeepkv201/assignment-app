import { LoadingButton } from "@mui/lab";
import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product, { ProductResponse } from "../../models/Product";
import { RootState } from "../../store";
import { clearCategory, setCategory } from "../../store/slices/categorySlice";
import { clearProducts, setProducts } from "../../store/slices/productsSlice";

export default function HomeFiters({ runReport, runPieReport }: Readonly<any>): JSX.Element {

    const dispatch = useDispatch();

    const selectedCategory = useSelector<RootState>((state) => state.category) as string;
    const selectedProducts = useSelector<RootState>((state) => state.products) as Product[];

    const [categoryOptions, setCategoryOptions] = useState<string[]>([] as string[]);
    const [productOptions, setProductOptions] = useState<Product[]>([] as Product[]);

    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Handle clear button actions
     */
    const clearFiltersHandler = (): void => {
        dispatch(clearProducts()); // Clear Selected Product.
        dispatch(clearCategory()); // Clear Selected Category.
        runPieReport(categoryOptions, 100 / categoryOptions.length);
    };

    /**
     * Shows Loader in Button for 3s and displays report.
     */
    const runReportHandler = (): void => {
        setLoading(true);
        if (selectedCategory) {
            setTimeout(() => {
                runReport(selectedProducts.length === 0 ? [...productOptions] : [...selectedProducts], selectedCategory);
                setLoading(false);
            }, 3000);
        } else {
            runPieReport(categoryOptions, 100 / categoryOptions.length);
        }
    };

    const isCategoryNotSelected = !selectedCategory; // Flag to check if category is not selected

    /**
     * Fetches categories on component mount.
     */
    useEffect((): void => {
        axios.get('/products/categories').then(({ data }: AxiosResponse<string[]>) => {
            setCategoryOptions(data); // Set Category Options.
        });
    }, []);

    /**
     * Fetch products list on category chnages.
     */
    useEffect((): void => {
        if (selectedCategory) {
            axios.get(`/products/category/${selectedCategory}`).then(({ data }: AxiosResponse<ProductResponse>) => {
                // Use Optional Chain to handle empty product options.
                dispatch(clearProducts());
                setProductOptions(data?.products ?? []);
            });
        } else {
            // Clear Selected Product and product options.
            setProductOptions([] as Product[]);
            dispatch(clearProducts()); // Clear Selected Product.
        }
    }, [dispatch, selectedCategory]);

    useEffect(() => {
        runPieReport(categoryOptions, 100 / categoryOptions.length);
    }, [runPieReport, categoryOptions]);

    return (
        <Stack gap={3} padding={3} sx={{ borderStyle: 'solid' }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h5">Filters</Typography>
                <Button variant="text" onClick={clearFiltersHandler}>Clear</Button>
            </Stack>
            <Stack rowGap={3}>
                <Autocomplete
                    id="select-category" autoHighlight
                    options={categoryOptions ?? []}
                    onChange={(event, value: any) => dispatch(value ? setCategory(value) : clearCategory())}
                    value={selectedCategory} isOptionEqualToValue={(a, b) => a === b}
                    renderInput={(params) => <TextField {...params} placeholder="Select Category" />}
                    sx={{ width: 300 }}
                />
                <Autocomplete
                    id="select-product" multiple autoHighlight disableCloseOnSelect disabled={isCategoryNotSelected}
                    options={productOptions.map((option: Product) => option) ?? []}
                    getOptionKey={((value: Product) => value.id)}
                    getOptionLabel={(option: Product) => option.title}
                    onChange={(_event, value: Product[]) => dispatch(value.length > 0 ? setProducts(value) : clearProducts())}
                    value={selectedProducts} isOptionEqualToValue={(a, b) => a.id === b.id}
                    renderInput={(params) => <TextField {...params} placeholder="Select Product" />}
                    sx={{ width: 300 }}
                />
            </Stack>
            <LoadingButton size="large" sx={{ mt: 'auto' }} onClick={runReportHandler} loading={loading} variant="contained" disabled={isCategoryNotSelected} color="primary">
                Run Report
            </LoadingButton>
        </Stack>
    );
}