// Chakra imports
import {
  Box,
  Flex,
  Text,
  HStack,
  Stack,
  Center,
  Select,
} from '@chakra-ui/react';
// Custom components
import Card from '../../../../components/molecules/card/Card';
import PieChart from '../../../../components/molecules/charts/PieChart';
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
  pieChartData,
  pieChartOptions,
} from 'variables/charts';
import Circle from '../../../atoms/vectors/Circle';
import { ITransactionReportChartProps } from '../interfaces';
import {
  attachRandomColor,
  attachStableColor,
} from '../../../../helpers/chartHelpers';
import { formatToNaira } from '../../../../helpers/currencyHelper';
import { removeHyphen } from '../../../../helpers/textHelpers';
import BarChart from '../BarChart';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';

const ExpectedPaymentChart = () => {

  return (
    <Card
      bg="white"
      borderRadius="8px"
      alignItems="center"
      flexDirection="column"
      w="100%"
      h={'full'}
      border="0.88px solid #E4E4E7"
      overflowY="auto"
    >
      <Box w="full" bg="white" pos={'relative'}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          mb="8px"
        >
          <Text variant="sm" fontSize={'16px'} fontWeight={'600'} mt="4px" color={'#C5B27D'}>
            Expected Repayment vs Actual
          </Text>

          <Select
            id="user_type"
            w="unset"
            variant="transparent"
            display="flex"
            alignItems="center"
            defaultValue="2025"
            color="black"
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </Select>
        </Flex>

        <Box>
          <Text variant="sm" fontSize={'14px'} fontWeight={'400'} mt="4px">
            January - December 2025
          </Text>
        </Box>

        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />

        <HStack p={[8, 0]} w={'full'} gap={[12, 4]} justifyContent={'center'}>
          <HStack spacing={4} alignItems="center">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="#2A9D90" />
            </svg>

            <Text variant="label" fontSize="14px" color="#546C8D">
              Expected Repayment
            </Text>
          </HStack>

          <HStack spacing={4} alignItems="center">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="#E76E50" />
            </svg>

            <Text variant="label" fontSize="14px" color="#546C8D">
              Actual Repayment
            </Text>
          </HStack>
        </HStack>
      </Box>
    </Card>
  );
};

export default ExpectedPaymentChart;
