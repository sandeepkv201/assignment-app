import { Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../../models/Product";
import { RootState } from "../../store";
import HighChartsColumn from "../highcharts/HighChartsColumn";
import HighChartsPie from "../highcharts/HighChartsPie";
import HomeFiters from "./HomeFilters";

function Dashboard(): JSX.Element {

    const selectedCategory = useSelector<RootState>((state) => state.category) as string;

    const [axisCategories, setAxisCategories] = useState<string[]>([]);
    const [columnSeries, setColumnSeries] = useState<any[]>([]);
    const [pieSeries, setPieSeries] = useState<any[]>([]);

    /**
     * Handle Products to be shown in Chart an prepares series data for chart
     */
    const runReport = useCallback((products: Product[]): void => {
        console.log('chartData', products);
        setAxisCategories(products.map(product => product.title));
        setColumnSeries([{ name: 'Price', data: products.map(product => product.price) }]);
        setPieSeries([]);
    }, []);

    /**
     * Handle Categories Overview to be shown in Pie Chart.
     */
    const runPieReport = useCallback((categories: string[], y: number) => {
        setColumnSeries([]);
        setPieSeries([{ name: 'Series', colorByPoint: true, data: categories.map(name => ({ name, y })) }]);
    }, []);

    return (
        <Stack direction={'row'} padding={3} gap={3} height={'100vh'} alignItems={'stretch'}>
            <HomeFiters runReport={runReport} runPie={runPieReport} />
            <Stack gap={3} flexGrow={1} justifyContent={'center'}>
                {!selectedCategory ? (
                    <HighChartsPie series={pieSeries} chartTitle={'Categories Overview'} />
                ) : (
                    <HighChartsColumn
                        categories={axisCategories} series={columnSeries}
                        yAxisTitle={`${selectedCategory} price`} chartTitle={`Products in ${selectedCategory} Category`}
                    />
                )}
            </Stack>
        </Stack>
    );
}

export default Dashboard;