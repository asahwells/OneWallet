import {
    Box,
    Flex,
    Text,
} from '@chakra-ui/react'
import Card from '../../card/Card'
import React from 'react'
import LineAreaChart from "../LineAreaChart";
import {getMonthName} from "../../../../helpers/dateHelpers";
import {lineChartOptionsTotalSpent} from "../../../../variables/charts";
import {ITransactionVolumeChartProps} from "../interfaces";
import {IGraphData} from "../../../../api-services/dashboard-services/interfaces";



// Helper function to transform the incoming data into the chart format
const transformChartData = (data: Array<IGraphData>) => {

    const volumes = data?.map((item) => parseFloat(item.transactionVolume));
    const months = data?.map((item) => getMonthName(item.month));

    return {
        chartData: [
            {
                name: "Volume",
                data: volumes,
            },
        ],
        chartOptions: {
            ...lineChartOptionsTotalSpent,
            xaxis: {
                ...lineChartOptionsTotalSpent.xaxis,
                categories: months,
            },
        },
    };
};

const TransactionVolumeChart = ( {data} : ITransactionVolumeChartProps) => {


    // Transform the data for the chart
    const { chartData, chartOptions } = transformChartData(data);

    return (
        <Card w='100%'  border={'0.88px solid #E4E4E7'} borderRadius={'8px'}>
            <Flex align='center' w='100%' px='15px' py='10px'>
                <Text
                    me='auto'
                    variant={'chartLabel'}
                >
                    Average Transaction Value & Volume Per User
                </Text>
            </Flex>

            <Box h='240px' mt='auto'>
                {/* Pass the transformed data and options into the chart */}
                <LineAreaChart chartData={chartData} chartOptions={chartOptions} />
            </Box>
        </Card>
    );
}

export default TransactionVolumeChart;
