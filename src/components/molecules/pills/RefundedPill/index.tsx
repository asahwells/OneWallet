import {Box, HStack, Text} from "@chakra-ui/react";
import {IPillProps} from "../interfaces";

const RefundedPill = ({...props} : IPillProps) => {
    return (
        <HStack  w={'90.13px'} h={'22.75px'}
                 borderRadius={'35px'}
                 bg={'#CFDADC'}
                 justifyContent={'center'}
                 {...props}
        >
            <Box bg={'#0F454F'} w={'7px'} h={'7px'} borderRadius={'full'}>

            </Box>

            <Text variant={'xs'} color={'#0F454F'}>
                Refunded
            </Text>
        </HStack>
    )
}
export default RefundedPill;