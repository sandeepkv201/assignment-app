import Highcharts from 'highcharts';
import HighchartsReact, { HighchartsReactProps, HighchartsReactRefObject } from "highcharts-react-official";
import { useRef } from "react";
import { NumberFormatter } from '../../helpers/formatters';

export default function HighChartsColumn({ options = {}, ...props }: Readonly<HighchartsReactProps>): JSX.Element {

    const chartComponentRef = useRef<HighchartsReactRefObject>(null);

    const defaultOptions: Highcharts.Options = {
        chart: {
            type: 'column',
            style: { fontFamily: 'Roboto' }, numberFormatter: NumberFormatter.currency
        },
        legend: { enabled: false },
        plotOptions: {
            column: {
                cursor: 'pointer',
                dataLabels: { enabled: true }
            }
        }
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={{ ...defaultOptions, ...options }} ref={chartComponentRef} {...props} />
    );
}