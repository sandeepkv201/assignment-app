import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactProps, HighchartsReactRefObject } from "highcharts-react-official";
import { useRef } from "react";
import { NumberFormatter } from '../../helpers/formatters';

export default function HighChartsPie({ chartTitle = '', series = [], ...props }: Readonly<HighchartsReactProps>): JSX.Element {

    const chartComponentRef = useRef<HighchartsReactRefObject>(null);

    const options: Highcharts.Options = {
        chart: {
            plotShadow: false,
            type: 'pie',
            style: { fontFamily: 'Roboto' }, numberFormatter: NumberFormatter.percent
        },
        title: { text: chartTitle, align: 'left' },
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