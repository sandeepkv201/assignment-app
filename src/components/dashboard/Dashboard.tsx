import { Stack } from "@mui/material";
import { useCallback, useState } from "react";
import Product from "../../models/Product";
import HighChartsColumn from "../highcharts/HighChartsColumn";
import HighChartsPie from "../highcharts/HighChartsPie";
import HomeFiters from "./HomeFilters";

function Dashboard(): JSX.Element {

    const [showColumnChart, setShowColumnChart] = useState<boolean>(false);

    const [pieOptions, setPieOpitons] = useState<Highcharts.Options>({});
    const [columnOptions, setColumnOptions] = useState<Highcharts.Options>({});

    /**
     * Handle Categories Overview to be shown in Pie Chart.
     */
    const runPieReport = useCallback((categories: string[], y: number) => {
        setShowColumnChart(false);
        setPieOpitons({
            title: { text: `${categories.length} Categories Overview`, align: 'left' },
            series: [{ name: 'Series', data: categories.map(name => ({ name, y })) }] as Highcharts.SeriesPieOptions[]
        });
    }, []);

    /**
     * Handle Products to be shown in Chart an prepares series data for chart
     */
    const runProductsReport = useCallback((products: Product[], selectedCategory: string): void => {
        setShowColumnChart(true);
        setColumnOptions({
            title: { text: `Products in ${selectedCategory} Category`, align: 'left' },
            xAxis: [{ categories: products.map(product => product.title) }],
            yAxis: [{ title: { text: `${selectedCategory} price` } }],
            series: [{ name: 'Price', data: products.map(product => product.price) }] as Highcharts.SeriesColumnOptions[]
        });
    }, []);

    return (
        <Stack direction={'row'} padding={3} gap={3} height={'100vh'} alignItems={'stretch'}>
            <HomeFiters runColumnReport={runProductsReport} runPieReport={runPieReport} />
            <Stack gap={3} flexGrow={1} justifyContent={'center'}>
                {showColumnChart ? (
                    <HighChartsColumn options={columnOptions} />
                ) : (
                    <HighChartsPie options={pieOptions} />
                )}
            </Stack>
        </Stack>
    );
}

export default Dashboard;