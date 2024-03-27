export const NumberFormatter = {
    currency: function currencyFormat(value: number) {
        return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    },
    percent: function (value: number) {
        return Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 }).format(value / 100);
    }
};
