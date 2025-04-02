
export interface ITransactionReportChartProps {
    data: Array<number>;
    labels: Array<string>;
    rawData: Array<any>
    isLoading?: boolean;
    h?: number;
    totalTransactionValue: string;
}

export interface ITransactionVolumeChartProps {
    data: Array<any>
}