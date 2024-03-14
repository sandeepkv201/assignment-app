import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

export default function HighChartsColumn({ categories, series, yAxisTitle = '', ...props }: HighchartsReact.Props) {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    const options: Highcharts.Options = {
        chart: {
            type: 'column', style: { fontFamily: 'Roboto' }, numberFormatter: function (value: number) {
                return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);;
            },
        },
        title: { text: '' },
        legend: { enabled: false },
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