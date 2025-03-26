import {Box, HStack, Text} from "@chakra-ui/react";
import {IPillProps} from "../interfaces";

const PendingPill = ({...props} : IPillProps) => {
    return (
        <HStack  w={'90.13px'} h={'22.75px'}
                 borderRadius={'35px'}
                 bg={'#F3F0E5'}
                 justifyContent={'center'}
                 {...props}
        >
            <Box bg={'#C5B27D'} w={'7px'} h={'7px'} borderRadius={'full'}>

            </Box>

            <Text variant={'xs'} color={'#C5B27D'}>
                Pending
            </Text>
        </HStack>
    )
}
export default PendingPill;