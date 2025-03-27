import {Box, HStack, Spinner, Stack, Text} from "@chakra-ui/react";
import {IAnalyticsCardProps} from "../interfaces";

const AnalyticsCard = ({title, value, isLoading, icon, ...props}: IAnalyticsCardProps) => {


    return (
        <HStack
            border={'0.88px solid #E4E4E7'}
            bg={'white'}
            px={8}
            py={4}
            w={'auto'}
            h={'79.63px'}
            borderRadius={'8px'}
            spacing={4}
            alignItems={'center'}
            justifyContent={'start'}
            {...props}
        >


                {icon}

                <Stack>

                    {isLoading ?
                        <Spinner size={'sm'}/>
                        :
                        <Text  fontWeight={'600'} fontSize={'20px'} >
                            {value}
                        </Text>}

                    <Text noOfLines={1} fontWeight={'400'} fontSize={'16px'} color={'#546C8D'} letterSpacing={'-1.2%'}>
                        {title}
                    </Text>

                </Stack>







        </HStack>
    )
}

export default AnalyticsCard