import {IGraphData, IGraphResp, IPieChartData} from "../../../../api-services/dashboard-services/interfaces";

export interface ITransactionReportChartProps {
    data: Array<number>;
    labels: Array<string>;
    rawData: Array<IPieChartData>
    isLoading?: boolean;
    h?: number;
    totalTransactionValue: string;
}

export interface ITransactionVolumeChartProps {
    data: Array<IGraphData>
}