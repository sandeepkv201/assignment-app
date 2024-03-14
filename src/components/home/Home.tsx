import { Menu } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Product from "../../models/Product";
import HighChartsColumn from "../highcharts/HighChartsColumn";
import HomeFiters from "./HomeFilters";

function Home(): JSX.Element {

    const [categories, setCategories] = useState<string[]>([]);
    const [series, setSeries] = useState<any[]>([]);
    const [yAxisTitle, setYAxisTitle] = useState<string>('Values')

    /**
     * Handle Products to be shown in Chart an prepares series data for chart
     * @param products 
     * @param selectedCategory 
     */
    const runReport = (products: Product[], selectedCategory: string) => {
        console.log('chartData', products);
        setYAxisTitle(selectedCategory);
        setCategories(products.map(product => product.title));
        setSeries([
            { name: 'Price', data: products.map(product => product.price), dataLabels: { enabled: true } }
        ]);
    };

    return (
        <Container maxWidth={false} sx={{ p: 3, display: 'flex', alignItems: 'stretch', height: '100vh' }}>
            <Grid container>
                <Grid item xs={3} sx={{ display: 'flex', alignItems: 'stretch' }}>
                    <HomeFiters runReport={runReport} />
                </Grid>
                <Grid item xs={9} display={'flex'} alignItems={'center'}>
                    <Stack padding={3} gap={3} flexGrow={1}>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant="h6">Products in selected Category</Typography>
                            <IconButton aria-label="title menu button"><Menu /></IconButton>
                        </Stack>
                        <Box padding={3}>
                            <HighChartsColumn categories={categories} series={series} yAxisTitle={yAxisTitle} />
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;