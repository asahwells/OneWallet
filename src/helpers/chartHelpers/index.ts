import {IPieChartData} from "../../api-services/dashboard-services/interfaces";

export const getPieChartLabels = (data: Array<IPieChartData>) => {
    return data.map((item: any) => item.operation);
}

export const getPieChartData = (data: Array<IPieChartData>) => {
    return data.map((item: any) => Number(item.transactionVolume));
}

export const attachRandomColor = (data: Array<IPieChartData>) => {
    return data.map((item: any) => {
        return {
            ...item,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        }
    })
}

const colors = ['#7963CD', '#9F00AD', '#51546F', '#5BC7E6', '#FF8F78', '#63CD81', '#EE0B0B'];
export const attachStableColor = (data: Array<IPieChartData>) => {
    return data.map((item, index) => ({
        ...item,
        color: colors[index % colors.length]
    }));
};