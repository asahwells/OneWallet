import {HStack, Stack, Text} from "@chakra-ui/react";
import {IAnalyticsCardProps} from "../interfaces";
import ForwardtoIcon from "../../../atoms/icons/ForwardToIcon";

const UserAnalyticsCard = ({title, value, ...props}: IAnalyticsCardProps) => {


    return (
        <Stack
            border={'0.88px solid #E4E4E7'}
            bg={'white'}
            p={2}
            w={'auto'}
            h={'auto'}
            borderRadius={'8px'}
            spacing={2}
            alignItems={'start'}
            cursor={'pointer'}
            {...props}
        >

            <HStack w={'full'} justifyContent={'space-between'}>
                <Text  variant={'xs'} color={props.color || '#546C8D'} letterSpacing={2}>
                    {title}
                </Text>

                <ForwardtoIcon />


            </HStack>



            <Text variant={'headerBold'} color={props.color || '#546C8D'}>
                {value}
            </Text>
        </Stack>
    )
}

export default UserAnalyticsCard