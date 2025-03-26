import {Box, HStack, Text} from "@chakra-ui/react";
import {IPillProps} from "../interfaces";

const SuccessPill = ({...props} : IPillProps) => {
    return (
        <HStack  w={'90.13px'} h={'22.75px'}
                 borderRadius={'35px'}
                 bg={'#DCFCE7'}
                 justifyContent={'center'}
                 {...props}
        >
            <Box bg={'#22C55E'} w={'7px'} h={'7px'} borderRadius={'full'}>

            </Box>

            <Text variant={'xs'}>
                Successful
            </Text>
        </HStack>
    )
}
export default SuccessPill;