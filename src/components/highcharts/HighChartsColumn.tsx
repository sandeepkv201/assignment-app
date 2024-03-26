import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactProps, HighchartsReactRefObject } from "highcharts-react-official";
import { useRef } from "react";

export default function HighChartsColumn({ chartTitle = '', categories = [], series = [], yAxisTitle = 'Values', ...props }: Readonly<HighchartsReactProps>): JSX.Element {

    const chartComponentRef = useRef<HighchartsReactRefObject>(null);

    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            style: { fontFamily: 'Roboto' }, numberFormatter: function (value: number) {
                return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
            }
        },
        title: { text: chartTitle, align: 'left' },
        legend: { enabled: false },
        plotOptions: {
            column: {
                cursor: 'pointer',
                dataLabels: { enabled: true }
            }
        },
        xAxis: [{ categories }],
        yAxis: [{
            title: { text: yAxisTitle }
        }],
        series
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} {...props} />
    );
}