// Chakra imports
import {Box, Flex, Text, HStack, Stack, Center, Select} from '@chakra-ui/react';
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
        // colors:  rawDataWithRandomColors.map((item) => item.color)
    }

    return (
        <Card
            bg="white"
            borderRadius="8px"
            alignItems="center"
            flexDirection="column"
            w="100%"
            h="320px"
            border='0.88px solid #E4E4E7'
            overflowY="auto"
        >
            <Box w="full" pos={'relative'}>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                    mb="8px"
                >
                    <Text variant="sm" fontSize={'16px'} mt="4px" color={'#C5B27D'} >
                        Active vs Inactive Devices
                    </Text>

                    <Select
                        id='user_type'
                        w='unset'
                        variant='unstyled'
                        display='flex'
                        alignItems='center'
                        defaultValue='This Week'
                        color={'#344256'}
                    >
                        <option value='Weekly'>This Week</option>
                        <option value='Daily'>Daily</option>
                        <option value='Monthly'>Monthly</option>
                    </Select>

                </Flex>

                {/*<Center>*/}

                {/*    <Text pos={'absolute'} variant="tableHeader" top={48} zIndex={10}>*/}
                {/*        {formatToNaira(totalTransactionValue)}*/}
                {/*    </Text>*/}

                {/*</Center>*/}

                <PieChart h="100%" w="150%" chartData={rawData} chartOptions={options} />

                <HStack  spacing={4} pt={4} w={'full'} justifyContent={'space-between'}>

                    <HStack spacing={3} alignItems="center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#7987FF"/>
                        </svg>

                        <Text variant="label" fontSize="14px" color="#546C8D">
                            Active Devices
                        </Text>
                    </HStack>

                    <HStack spacing={4} alignItems="center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#FFA5CB"/>
                        </svg>

                        <Text variant="label" fontSize="14px" color="#546C8D">
                            Inactive Devices
                        </Text>
                    </HStack>

                </HStack>
            </Box>
        </Card>
    );
};

export default TransactionReportChart;
