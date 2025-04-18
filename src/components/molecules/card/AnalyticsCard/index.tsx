import {Box, HStack, Spinner, Stack, Text, useBreakpointValue} from "@chakra-ui/react";
import {IAnalyticsCardProps} from "../interfaces";

const AnalyticsCard = ({title, value, isLoading, icon, ...props}: IAnalyticsCardProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });


    return (
        <HStack
            border={'0.88px solid #E4E4E7'}
            bg={'white'}
            px={{
                base: 2,
                md: 8,
            }}
            py={{
                base: 2,
                md: 4,
            }}
            w={'auto'}
            h={'full'}
            borderRadius={'8px'}
            spacing={4}
            alignItems={'center'}
            justifyContent={'start'}
            {...props}
        >

            { isMobile
                ?

                <Stack>

                    <HStack>
                        {icon}


                        {isLoading ?
                            <Spinner size={'sm'}/>
                            :
                            <Text  fontWeight={'600'} fontSize={'18px'} >
                                {value}
                            </Text>}



                    </HStack>
                    <Text noOfLines={1} fontWeight={'400'} fontSize={'16px'} color={'#546C8D'} letterSpacing={'-1.2%'}>
                        {title}
                    </Text>

                    </Stack>
                :
            <>
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
            </>
            }








        </HStack>
    )
}

export default AnalyticsCard