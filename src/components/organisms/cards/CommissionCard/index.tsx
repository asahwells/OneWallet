import {HStack, Stack, Text} from "@chakra-ui/react";
import BaseButton from "../../../molecules/buttons/BaseButton";

const CommissionCard  = () => {

    return (
        <Stack bg={'#0F454F'} w={'full'} borderRadius={'8px'} py={3} px={6} >

            <HStack py={2} px={5} borderRadius={'4px'} bg={'white'} w={'full'} alignItems={'center'} justifyContent={'space-between'} spacing={20}>
                <Stack spacing={1} w={'full'}>
                    <Text fontWeight={'700'} fontSize={'14px'} color={'#344256'}>
                        Commissions
                    </Text>

                    <Text fontWeight={'600'} fontSize={'20px'} >
                        ₦5,090.09
                    </Text>

                </Stack>

                <BaseButton bg={'#C5B27D'} color={'white'} p={2} borderRadius={'5px'} px={6} text={'Cash Out'} />

            </HStack>

        </Stack>

    )
}

export default CommissionCard