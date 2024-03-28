import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactProps, HighchartsReactRefObject } from "highcharts-react-official";
import { useRef } from "react";
import { NumberFormatter } from '../../helpers/formatters';

export default function HighChartsPie({ options = {}, ...props }: Readonly<HighchartsReactProps>): JSX.Element {

    const chartComponentRef = useRef<HighchartsReactRefObject>(null);

    const defaultOptions: Highcharts.Options = {
        chart: {
            plotShadow: false,
            type: 'pie',
            style: { fontFamily: 'Roboto' }, numberFormatter: NumberFormatter.percent
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
        },
        plotOptions: {
            pie: {
                cursor: 'pointer',
                dataLabels: { enabled: true }
            }
        }
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={{ ...defaultOptions, ...options }} ref={chartComponentRef} {...props} />
    );
}