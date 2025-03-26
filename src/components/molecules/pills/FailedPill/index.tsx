import {Box, HStack, Text} from "@chakra-ui/react";
import {IPillProps} from "../interfaces";

const FailedPill = ({...props} : IPillProps) => {
    return (
        <HStack  w={'90.13px'} h={'22.75px'}
                 borderRadius={'35px'}
                 bg={'#FEE2E2'}
                 justifyContent={'center'}
                 {...props}
        >
            <Box bg={'#EF4444'} w={'7px'} h={'7px'} borderRadius={'full'}>

            </Box>

            <Text variant={'xs'} color={'#EF4444'}>
                Successful
            </Text>
        </HStack>
    )
}
export default FailedPill;