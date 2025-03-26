// Chakra imports
import {Box, Flex, Text, HStack, Stack, Center} from '@chakra-ui/react';
// Custom components
import Card from '../../../../components/molecules/card/Card';
import PieChart from '../../../../components/molecules/charts/PieChart';
import { pieChartData, pieChartOptions } from 'variables/charts';
import Circle from '../../../atoms/vectors/Circle';
import {ITransactionReportChartProps} from "../interfaces";
import {attachRandomColor, attachStableColor} from "../../../../helpers/chartHelpers";
import {formatToNaira} from "../../../../helpers/currencyHelper";
import {removeHyphen} from "../../../../helpers/textHelpers";

const TransactionReportChart = ( { rawData, labels, data, h, totalTransactionValue} : ITransactionReportChartProps ) => {


    const rawDataWithRandomColors = attachStableColor(rawData);

    const options = {

        ...pieChartOptions,
        labels,
        colors:  rawDataWithRandomColors.map((item) => item.color)
    }

    return (
        <Card
            bg="white"
            h={'510px'}
            mt={-210}
            borderRadius="8px"
            p="20px"
            alignItems="center"
            flexDirection="column"
            minW="418px"
            w="100%"
            border='0.88px solid #E4E4E7'
            overflowY="auto"
        >
            <Box w="full" bg="#F5F6FA" p={4} pos={'relative'}>
                <Flex
                    px={{ base: '0px', '2xl': '10px' }}
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                    mb="8px"
                >
                    <Text variant="tableHeader" mt="4px">
                        Transaction Report
                    </Text>
                </Flex>

                <Center>

                    <Text pos={'absolute'} variant="tableHeader" top={48} zIndex={10}>
                        {formatToNaira(totalTransactionValue)}
                    </Text>

                </Center>

                <PieChart h="100%" w="100%" chartData={data} chartOptions={options} />

                <Stack mt={h ||-32} spacing={4} p={8}>
                    {attachStableColor(rawData).map((transaction, index) => (
                        <HStack justifyContent="space-between" w="full" key={index}>
                            <HStack>
                                <Circle w="12px" h="12px" background={transaction.color} />
                                <Text variant="sideBar">
                                    {removeHyphen(transaction.operation)}
                                </Text>
                            </HStack>
                            <Text variant="sideBar">{formatToNaira(transaction.transactionVolume)}</Text>
                        </HStack>
                    ))}
                </Stack>
            </Box>
        </Card>
    );
};

export default TransactionReportChart;
