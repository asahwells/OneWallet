// Chakra imports
import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import Card from '../../card/Card'
// Custom components
import React from 'react'
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent
} from '../../../../variables/charts'
import LineAreaChart from "../LineAreaChart";

const  MerchantTransactionVolumeChart =  (props: { [x: string]: any }) =>  {
    const { ...rest } = props

    return (
        <Card w='100%' {...rest}  border={'0.88px solid #E4E4E7'} borderRadius={'8px'}>
            <Flex align='center' w='100%' px='15px' py='10px'>
                <Text
                    me='auto'
                    variant={'chartLabel'}
                >
                    Average Transaction Value & Volume Per Merchant
                </Text>

            </Flex>

            <Box h='240px' mt='auto'>
                <LineAreaChart chartData={lineChartDataTotalSpent} chartOptions={lineChartOptionsTotalSpent} />
            </Box>
        </Card>
    )
}

export default MerchantTransactionVolumeChart
