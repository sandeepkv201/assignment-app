import { Options } from "highcharts";
import { NumberFormatter } from "./formatters";

export function mergeHighChartsOptions({
    chartTitle = '',
    type = 'column',
    numberFormatter = NumberFormatter.currency,
    categories = [],
    yAxisTitle = 'Values',
    series = []
}: any): Options {
    return {
        title: { text: chartTitle, align: 'left' },
        legend: { enabled: false },
        chart: {
            type,
            style: { fontFamily: 'Roboto' }, numberFormatter
        },
        xAxis: [{ categories }],
        yAxis: [{
            title: { text: yAxisTitle }
        }],
        series
    } as Options;
}