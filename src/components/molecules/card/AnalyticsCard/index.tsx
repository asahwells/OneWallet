import {Box, Spinner, Stack, Text} from "@chakra-ui/react";
import {IAnalyticsCardProps} from "../interfaces";

const AnalyticsCard = ({title, value, isLoading, ...props}: IAnalyticsCardProps) => {


    return (
        <Stack
            border={'0.88px solid #E4E4E7'}
            bg={'white'}
            px={6}
            py={4}
            w={'210.55px'}
            h={'79.63px'}
            borderRadius={'8px'}
            spacing={4}
            alignItems={'start'}
            {...props}
        >

            <Text noOfLines={1} variant={'xs'} color={'#546C8D'} letterSpacing={2}>
                {title}
            </Text>


            {isLoading ?
                    <Spinner size={'sm'}/>
                :
                <Text variant={'headerBold'}>
                {value}
                </Text>}

        </Stack>
    )
}

export default AnalyticsCard