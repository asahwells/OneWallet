import {HStack, Spinner, Stack, Text} from "@chakra-ui/react";
import BaseButton from "../../../molecules/buttons/BaseButton";
import { CommissionCardProps } from "../interfaces";

const CommissionCard  = ({commission, isLoading}: CommissionCardProps) => {

    return (
        <Stack bg={'#0F454F'} w={'full'} borderRadius={'8px'} py={3} px={6} >

            <HStack py={2} px={5} borderRadius={'4px'} bg={'white'} w={'full'} alignItems={'center'} justifyContent={'space-between'} spacing={{ base: "10", md:"20" }}>
                <Stack spacing={1} w={'full'}>
                    <Text fontWeight={'700'} fontSize={'14px'} color={'#344256'}>
                        Commissions
                    </Text>
                    
                    {isLoading ?

                        <Spinner size={'sm'}/> 
                        :
                        <Text fontWeight={'600'} fontSize={'20px'} >
                            ₦{commission}
                        </Text>
                    }

                </Stack>

                <BaseButton bg={'#C5B27D'} variant={'sm'} color={'white'} borderRadius={'5.14px'} px={8} text={'Cash Out'} isDisabled={commission < 1} />

            </HStack>

        </Stack>

    )
}

export default CommissionCard