import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactProps, HighchartsReactRefObject } from "highcharts-react-official";
import { useRef } from "react";
import { NumberFormatter } from '../../helpers/formatters';

export default function HighChartsColumn({ chartTitle = '', categories = [], series = [], yAxisTitle = 'Values', ...props }: Readonly<HighchartsReactProps>): JSX.Element {

    const chartComponentRef = useRef<HighchartsReactRefObject>(null);

    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            style: { fontFamily: 'Roboto' }, numberFormatter: NumberFormatter.currency
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