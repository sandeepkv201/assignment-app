import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactProps, HighchartsReactRefObject } from "highcharts-react-official";
import { useRef } from "react";

export default function HighChartsPie({ chartTitle = '', series = [], ...props }: HighchartsReactProps): JSX.Element {

    const chartComponentRef = useRef<HighchartsReactRefObject>(null);

    const options: Highcharts.Options = {
        chart: {
            plotShadow: false,
            type: 'pie',
            style: { fontFamily: 'Roboto' }, numberFormatter: function (value: number) {
                return Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 }).format(value / 100);
            }
        },
        title: {
            text: chartTitle
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
        },
        plotOptions: {
            pie: {
                cursor: 'pointer',
                dataLabels: { enabled: true }
            }
        },
        series
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} {...props} />
    );
}